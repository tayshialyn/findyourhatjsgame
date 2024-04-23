const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this._field = field;
  }
  print() {
    // Print out the field
    let str = "";
    for (let i = 0; i < this._field.length; i++) {
      str += this._field[i].join(" ") + "\n";
    }
    console.log(str);
  }

  getFieldWidth() {
    // Assumes all rows are of equal width
    return this._field[0].length;
  }

  getFieldHeight() {
    return this._field.length;
  }

  checkIsHole(x, y) {
    if (this._field[y][x] === "O") {
      return true;
    } else {
      return false;
    }
  }

  checkIsHat(x, y) {
    if (this._field[y][x] === "^") {
      return true;
    } else {
      return false;
    }
  }

  movePlayer(x, y) {
    // Mark locations that player has moved to with a *
    this._field[y][x] = "*";
  }

  static generateField(width, height) {
    var possibleCharacters = "░O^";

    var arr = [];
    // Set individual field location
    for (var y = 0; y < height; y++) {
      arr[y] = [];
      for (var x = 0; x < width; x++) {
        var randomIndex = Math.floor(Math.random() * possibleCharacters.length);
        arr[y][x] = possibleCharacters.charAt(randomIndex);

        // If currently generated cell is a hat
        // Check if hat is on any of the cells before current xy
        // if alreay
      }
    }

    // Set starting position
    arr[0][0] = "*";
    console.log(arr);
    return arr;
  }
}

// ########### Actual game logic ################
const prompt = require("prompt-sync")();

// // Hardcoded Field
// const myField = new Field([
//   ["*", "░", "O"],
//   ["░", "O", "░"],
//   ["░", "^", "░"],
// ]);

// Generate field
const myField = new Field(Field.generateField(10, 10));

let gameEnd = false;
let playerCurrentLocationX = 0;
let playerCurrentLocationY = 0;

while (!gameEnd) {
  myField.print();

  // Get direction to move
  const direction = prompt("Which way?");
  switch (direction) {
    case "u":
      playerCurrentLocationY--;
      break;
    case "d":
      playerCurrentLocationY++;
      break;
    case "l":
      playerCurrentLocationX--;
      break;
    case "r":
      playerCurrentLocationX++;
      break;
    default:
      break;
  }

  // Check if any of the 3 end game conditions are fulfilled
  // 3. Move outside field
  if (
    playerCurrentLocationX < 0 ||
    playerCurrentLocationY < 0 ||
    playerCurrentLocationX >= myField.getFieldWidth() ||
    playerCurrentLocationY >= myField.getFieldHeight()
  ) {
    gameEnd = true;
    console.log("Out of bound instruction");
    break;
  }
  // 1. Found hat
  if (myField.checkIsHat(playerCurrentLocationX, playerCurrentLocationY)) {
    gameEnd = true;
    console.log("You found the hat! Carrot for you!🥕");
    break;
  }
  // 2. Fall into hole
  if (myField.checkIsHole(playerCurrentLocationX, playerCurrentLocationY)) {
    gameEnd = true;
    console.log("You fell into rabbit hole!🐰🐇");
    break;
  }

  // Move player
  myField.movePlayer(playerCurrentLocationX, playerCurrentLocationY);
}

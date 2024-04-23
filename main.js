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

  static generateField(width, height, holesPercent, numbersOfHat) {
    var possibleCharacters = "░O";

    var arr = [];
    // Set individual field location
    for (var y = 0; y < height; y++) {
      arr[y] = [];
      for (var x = 0; x < width; x++) {
        // Just take any random character from possibleCharacters
        // var randomIndex = Math.floor(Math.random() * possibleCharacters.length);
        // arr[y][x] = possibleCharacters.charAt(randomIndex);

        // Dynamically generate % of holes
        var holeOrEmptyField = Math.random() < holesPercent ? 'O' : '░'; // Set O if random number generator is less than holesPercent. Random always return 0 ~ less than 1. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        arr[y][x] = holeOrEmptyField;
      }
    }

    // Set hat into field
    for (var x = 0; x < numbersOfHat; x++) {
      var hatPositionX = 0;
      var hatPositionY = 0;
      while ((hatPositionX + hatPositionY === 0) || arr[hatPositionY][hatPositionX] === "^") {// if (hat is at [0][0]) OR (field is already a hat), just loop again, else later lesser hat then what we really want cause kena set 2 times
        var hatPositionX = Math.floor(Math.random() * width); //Math.floor round down decimals https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
        var hatPositionY = Math.floor(Math.random() * height); //Google for generate random number between 2 numbers in javascript and see https://stackoverflow.com/a/24152886
      }
      arr[hatPositionY][hatPositionX] = "^"; // Set hat location
    }

    // Set starting position
    arr[0][0] = "*";
    // console.log(arr);
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

// Ask user for game configuration
const holesPercent = prompt("Percentage of holes🕳️? Use decimal, e.g. 0.1 for 10%: ");
const numbersOfHat = prompt("Number of hat🤠? ");

// Generate field
const myField = new Field(Field.generateField(10, 10, holesPercent, numbersOfHat));

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

var boardupdater;
var score;
var blockSize = 15;
var rows = 25;
var cols = 25;
var board;
var context;
var snakeC;
var snakeR;
var snakeBody;
var snakeSpeed; //every snakeSpeed mili sec the snake moves
var foodR;
var foodC;
var moveUp, moveDown, moveRight, moveLeft; // intervalEvents that happen after some interval, reduce the interval b/w 2 function calls to increase the speed of the game.
document.addEventListener("keydown", play);
window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  setBoard();
};

function setBoard() {
  //clear any pre set movements
  clearInterval(moveDown);
  clearInterval(moveRight);
  clearInterval(moveLeft);
  clearInterval(moveUp);
  clearInterval(boardupdater);
  //initilize snake head position
  snakeC = 9 * blockSize;
  snakeR = 9 * blockSize;
  //generate random food
  generateFood();
  //set snakeSpeed
  snakeSpeed = 200;
  //set snake body to have nothing
  snakeBody = [];
  //make sure to update the board every 10 mili sec
  boardupdater = setInterval(upDateBoard, 10); //every 50 ms all the pixles are re-rendered
  //set score to 0
  score = 0;
  displayScore();
}

function upDateBoard() {
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = "red";
  context.fillRect(foodC, foodR, blockSize, blockSize);
  context.fillStyle = "green";
  for (item of snakeBody) {
    R = item[0];
    C = item[1];
    context.fillRect(C, R, blockSize, blockSize);
  }
  context.fillStyle = "lime";
  context.fillRect(snakeC, snakeR, blockSize, blockSize);

  //fillRect(x,y,xFillSize,yFillSize) =>here x connresponds to the number of cols in board and y corresponds to number of rows in board
}

function generateFood() {
  foodR = Math.floor(Math.random() * rows) * blockSize;
  foodC = Math.floor(Math.random() * cols) * blockSize;
}

function play(e) {
  e.preventDefault();
  if (e.code === "ArrowUp") {
    clearInterval(moveDown);
    clearInterval(moveRight);
    clearInterval(moveLeft);
    clearInterval(moveUp);
    moveUp = setInterval(up, snakeSpeed);
    //snakeR = snakeR - 1 * blockSize;
  }
  if (e.code === "ArrowDown") {
    clearInterval(moveUp);
    clearInterval(moveRight);
    clearInterval(moveLeft);
    clearInterval(moveDown);
    moveDown = setInterval(down, snakeSpeed);
    //snakeR = snakeR + 1 * blockSize;
  }
  if (e.code === "ArrowRight") {
    clearInterval(moveDown);
    clearInterval(moveUp);
    clearInterval(moveLeft);
    clearInterval(moveRight);
    moveRight = setInterval(right, snakeSpeed);
    //snakeC = snakeC + 1 * blockSize;
  }
  if (e.code === "ArrowLeft") {
    clearInterval(moveDown);
    clearInterval(moveRight);
    clearInterval(moveUp);
    clearInterval(moveLeft);
    moveLeft = setInterval(left, snakeSpeed);
    //snakeC = snakeC - 1 * blockSize;
  }
  if (e.code === "Space") {
    clearInterval(moveDown);
    clearInterval(moveRight);
    clearInterval(moveUp);
    clearInterval(moveLeft);
    //snakeC = snakeC - 1 * blockSize;
  }
}

function up() {
  moveSnakeBody();
  snakeR = snakeR - 1 * blockSize;
  if ((snakeR == foodR) & (snakeC == foodC)) {
    snakeBody.push([foodR, foodC]);
    generateFood();
    score += 1;
    snakeSpeed -= 1;
    displayScore();
  }
  if (
    (snakeR === rows * blockSize) |
    (snakeC === cols * blockSize) |
    (snakeR < 0) |
    (snakeC < 0)
  ) {
    console.log("Game over");
    setBoard();
  }
}

function down() {
  moveSnakeBody();
  snakeR = snakeR + 1 * blockSize;
  if ((snakeR == foodR) & (snakeC == foodC)) {
    snakeBody.push([foodR, foodC]);
    generateFood();
    score += 1;
    snakeSpeed -= 1;
    displayScore();
  }
  if (
    (snakeR === rows * blockSize) |
    (snakeC === cols * blockSize) |
    (snakeR < 0) |
    (snakeC < 0)
  ) {
    console.log("Game over");
    setBoard();
  }
}

function left() {
  moveSnakeBody();
  snakeC = snakeC - 1 * blockSize;
  if ((snakeR == foodR) & (snakeC == foodC)) {
    snakeBody.push([foodR, foodC]);
    generateFood();
    score += 1;
    snakeSpeed -= 1;
    displayScore();
  }
  if (
    (snakeR === rows * blockSize) |
    (snakeC === cols * blockSize) |
    (snakeR < 0) |
    (snakeC < 0)
  ) {
    console.log("Game over");
    setBoard();
  }
}

function right() {
  moveSnakeBody();
  snakeC = snakeC + 1 * blockSize;
  if ((snakeR == foodR) & (snakeC == foodC)) {
    snakeBody.push([foodR, foodC]);
    generateFood();
    score += 1;
    snakeSpeed -= 1;
    displayScore();
  }
  if (
    (snakeR === rows * blockSize) |
    (snakeC === cols * blockSize) |
    (snakeR < 0) |
    (snakeC < 0)
  ) {
    setBoard();
  }
}

function displayScore() {
  let scoreDisplay = document.getElementById("score");
  scoreDisplay.innerHTML = "Score:" + score;
}

function moveSnakeBody() {
  n = snakeBody.length;

  temp = snakeBody[n - 1];
  snakeBody[n - 1] = [snakeR, snakeC];
  i = n - 2;
  while (i >= 0) {
    cur = snakeBody[i];
    snakeBody[i] = temp;
    temp = cur;
    i -= 1;
  }
}

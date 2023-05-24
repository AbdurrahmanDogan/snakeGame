const gameBoard = document.querySelector(".game"); // hier roep ik de variabelen en canvas aan in HTML
const ctx = gameBoard.getContext("2d"); // hier maak ik ctx aan en 2d om te kunnen coneccten
const scoreText = document.querySelector(".scoreText");
const resetBtn = document.querySelector(".resetBtn");
const img = document.querySelector("img");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white;";
const snakeColor = "white"; // HIER ZIJN ALLE VARIABELEN
const snakeBorder = "black";
const foodColor = "red"; // hier is de food kleur rood
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY; // hier maak ik variabele aan voor snake
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 }, // grootte
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection); // hier luistert die naar mijn pijltjes
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score; // start van de game
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake(); // hier geef ik  allemaal variabelen aan waar ik later vertel wat ze moeten doen
      drawSnake();
      checkGameOver();
      nextTick();
    }, 200); // met 200 geef ik aan  hoe snel de slang moet bewegen - hoe hoger de getal hoe langzamer de slang
  } else {
    displayGameOver(); // hier geeft die aan dat je hebt verloren met een game over
  }
}
function clearBoard() {
  console.log("clearBoard()");
  ctx.fillStyle = clearBoard;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function randomFood(min, max) {
  const randNum =
    Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
  return randNum; // hier zorg ik ervoor dat er eke keer random een appel spwant
}

function createFood() {
  console.log("createFood()");
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
function drawFood() {
  console.log("drawFood()");

  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = {
    x: snake[0].x + xVelocity,
    y: snake[0].y + yVelocity,
  };

  snake.unshift(head);

  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score; // als appel gegeten
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize); // hier komt de snake heletijd door ctx
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  const goingUp = yVelocity == -unitSize;
  const goingDown = yVelocity == unitSize; // hier geef ik alle variabelen een waarde voor als ik ga drukken op pijltjes
  const goingRight = xVelocity == unitSize;
  const goingLeft = xVelocity == -unitSize;

  switch (true) {
    case keyPressed == LEFT && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed == UP && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize; // hier luistert die naar mijn pijltjes
      break;
    case keyPressed == RIGHT && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed == DOWN && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false; // hier geeft die alle mogelijkheden aanom af te kunnen zijn
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "35px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center"; // hier komt HAHA JE BENT AF! in het beeldscherm
  ctx.fillText("HAHA JE BENT AF!", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    { x: unitSize * 4, y: 0 }, // hier wordt de game gereset
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}

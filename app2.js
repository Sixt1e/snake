document.getElementById("restart-btn").addEventListener("click", restartGame);

let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");
let speed = 20; // Размер клетки и скорость змейки
let snake = [
  { x: 160, y: 160 },
  { x: 140, y: 160 },
  { x: 120, y: 160 },
];
let foodX;
let foodY;
let dx = speed; // Начальное направление движения вправо
let dy = 0;
let gameOver = false;

canvas.width = 500;
canvas.height = 500;

function main() {
  document.getElementById("start-btn").style.display = "none";
  if (gameOver) {
    return gameOverFunction();
  }

  setTimeout(function () {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    main();
  }, 100);
}

function clearCanvas() {
  ctx.fillStyle = "#657B6E"; // Цвет фона
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Отрисовка змейки
function drawSnake() {
  snake.forEach(function (snakePart) {
    ctx.fillStyle = "#000000"; // Цвет змейки
    ctx.fillRect(snakePart.x, snakePart.y, speed, speed);
    ctx.strokeStyle = "darkgreen";
    ctx.strokeRect(snakePart.x, snakePart.y, speed, speed);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    createFood(); // Создать новую еду
  } else {
    snake.pop();
  }

  checkCollision();
}

function createFood() {
  foodX = Math.floor(Math.random() * (canvas.width / speed)) * speed;
  foodY = Math.floor(Math.random() * (canvas.height / speed)) * speed;
}

// Отрисовка еды
function drawFood() {
  ctx.fillStyle = "#C60000"; // Цвет еды
  ctx.fillRect(foodX, foodY, speed, speed);
  ctx.strokeStyle = "darkred";
  ctx.strokeRect(foodX, foodY, speed, speed);
}

// Движение змейки
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -speed;
  const goingDown = dy === speed;
  const goingRight = dx === speed;
  const goingLeft = dx === -speed;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -speed;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -speed;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = speed;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = speed;
  }
}

function checkCollision() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      gameOver = true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - speed;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - speed;

  if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
    gameOver = true;
  }
}

function gameOverFunction() {
  ctx.textAlign = "center"; // Выравнивание по горизонтали
  ctx.textBaseline = "middle"; // Выравнивание по вертикали
  ctx.fillStyle = "white";
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
  document.getElementById("restart-btn").style.display = "block";
}

function restartGame() {
  snake = [
    { x: 160, y: 160 },
    { x: 140, y: 160 },
    { x: 120, y: 160 },
  ];
  dx = speed;
  dy = 0;
  gameOver = false;
  document.getElementById("restart-btn").style.display = "none";
  createFood();
  main();
}

document.getElementById("start-btn").addEventListener("click", function () {
  main();
});

document.getElementById("restart-btn").addEventListener("click", restartGame);

document.addEventListener("keydown", changeDirection);
createFood();

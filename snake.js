var speed = 120;

function Snake(canvas, context) {
  this.x = 1;
  this.y = 1;
  this.deltax = 0;
  this.deltay = 0;
  this.addcount = 0;
  this.addlength = 3;
  this.count = 0;
  this.adding = false;
  this.body = [];
  this.moveQueue = [];
  this.scale = 16;
  this.dead = false;
  this.firstkeypress = false;

  this.food = {
    x: Math.floor((Math.random() * canvas.width) / this.scale) * this.scale + 1,
    y:
      Math.floor((Math.random() * canvas.height) / this.scale) * this.scale + 1,
  };

  this.readMoveQueue = function () {
    switch (this.moveQueue.shift()) {
      case 38:
        if (this.deltay != 1) {
          this.deltay = -1;
          this.deltax = 0;
        }
        break;
      case 40:
        if (this.deltay != -1) {
          this.deltay = 1;
          this.deltax = 0;
        }
        break;
      case 37:
        if (this.deltax != 1) {
          this.deltax = -1;
          this.deltay = 0;
        }
        break;
      case 39:
        if (this.deltax != -1) {
          this.deltax = 1;
          this.deltay = 0;
        }
        break;
    }
  };

  this.move = function () {
    this.readMoveQueue();

    for (var i = 0; i < this.body.length; i++) {
      if (this.x == this.body[i].x && this.y == this.body[i].y) {
        this.dead = true;
        alert("You died!!");
        break;
      }
    }

    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      this.dead = true;
      alert("You died!!");
    }

    if (this.x == this.food.x && this.y == this.food.y) {
      this.food.x =
        Math.floor((Math.random() * canvas.width) / this.scale) * this.scale +
        1;
      this.food.y =
        Math.floor((Math.random() * canvas.height) / this.scale) * this.scale +
        1;
      this.adding = true;
    }

    if (this.adding) {
      if (this.addcount == this.addlength) {
        this.adding = false;
        this.addcount = 0;
      } else {
        this.addcount += 1;
        this.count += 1;
      }
    }

    if (this.count == this.body.length) {
      this.body.shift();
    }

    this.body[this.count - 1] = {
      x: this.x,
      y: this.y,
    };

    this.x += this.deltax * this.scale;
    this.y += this.deltay * this.scale;
    this.firstkeypress = false;
  };

  this.draw = function () {
    context.clearRect(0, 0, c.width, c.height);
    context.fillStyle = "black";
    context.fillRect(this.x, this.y, this.scale - 2, this.scale - 2);
    context.fillStyle = "blue";

    for (var i = 0; i < this.body.length; i++) {
      context.fillRect(
        this.body[i].x,
        this.body[i].y,
        this.scale - 2,
        this.scale - 2
      );
    }

    context.fillStyle = "green";
    context.fillRect(this.food.x, this.food.y, this.scale - 2, this.scale - 2);
  };

  this.key = function (keyCode) {
    this.moveQueue.push(keyCode);
  };
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var snake = new Snake(c, ctx);

function gameLoop() {
  if (!snake.dead) {
    snake.move();
    snake.draw();
  } else {
    snake = new Snake(c, ctx);
  }
}

document.addEventListener("keydown", function (keyPress) {
  snake.key(keyPress.keyCode);
});

var gameLoopHandle = window.setInterval(gameLoop, speed);

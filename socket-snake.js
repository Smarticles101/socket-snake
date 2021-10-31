var socket = io();

let ctx = document.getElementById("myCanvas").getContext("2d");
let c = document.getElementById("myCanvas");
console.log(socket.id);

let players = {};

socket.on("init", function (data) {
  players[data.id] = data;
});

socket.on("players", function (data) {
  players = data;
});

socket.on("disconnected", function (data) {
  delete players[data];
});

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, c.width, c.height);

  for (const [id, player] of Object.entries(players)) {
    ctx.fillStyle = "blue";
    console.log(id, socket.id);
    if (id == socket.id) {
      ctx.fillStyle = "red";
    }

    ctx.fillRect(player.x, player.y, 10, 10);
  }
}

var loop = window.setInterval(draw, 120);

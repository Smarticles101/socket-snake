const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/snake.js", (req, res) => {
  res.sendFile(__dirname + "/snake.js");
});

app.get("/socket-snake.js", (req, res) => {
  res.sendFile(__dirname + "/socket-snake.js");
});

let players = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  player = {
    id: socket.id,
    x: Math.floor(Math.random() * 50) * 10,
    y: Math.floor(Math.random() * 50) * 10,
  };

  socket.emit("players", players);
  socket.emit("init", player);
  socket.broadcast.emit("init", player);

  socket.on("disconnect", () => {
    delete players[socket.id];
    console.log("a user disconnected");
    socket.broadcast.emit("disconnected", socket.id);
  });

  players[socket.id] = player;
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

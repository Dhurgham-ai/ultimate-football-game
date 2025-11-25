const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static('public')); 

let gameState = {
  red: { x: 100, y: 200 },
  green: { x: 700, y: 200 },
  ball: { x: 400, y: 200, dx: 0, dy: 0 },
  score: { red: 0, green: 0 }
};

io.on('connection', socket => {
  socket.emit('init', gameState);

  socket.on('moveGreen', dir => {
    const speed = 3;
    if (dir === 'up') gameState.green.y -= speed;
    if (dir === 'down') gameState.green.y += speed;
    if (dir === 'left') gameState.green.x -= speed;
    if (dir === 'right') gameState.green.x += speed;
    io.emit('update', gameState);
  });

  socket.on('disconnect', () => {
    console.log('Player disconnected');
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));

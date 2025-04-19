const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let tasks = [];

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('loadTasks', tasks);

  socket.on('addTask', (task) => {
    tasks.push(task);
    io.emit('loadTasks', tasks);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Backend server listening on http://localhost:3001');
});

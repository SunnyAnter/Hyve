const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { join } = require('node:path');
const router = require('./router');
const conf = require('./config');
const app = express();
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  }
})
io.on("connection", (socket) => {
  console.log('user connected: ' + socket.id)
  socket.on("join-room", (data) => {
    socket.join(data)
  })
  socket.on("send-message", (data) => {
    socket.to(data.room).emit("recieve-message", data)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
})

app
  .use(cors())
  .use(express.json())
  .use(router);

  server
  .listen(conf.port, () => {
    console.log(`Server running on http://localhost:${conf.port}`);
  });
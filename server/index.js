const express = require('express');
const cors = require('cors');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
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
  socket.on("join-room", (data) => {
    socket.join(data)
  })
  socket.on("send-message", (data) => {
    socket.to(data.room).emit("recieve-message", data)
  })
  socket.on("delete-task", (data) => {
    socket.broadcast.emit("deleted-task", data)
  })
  socket.on("update-task", (data) => {
    socket.broadcast.emit("updated-task", data)
  })
  socket.on("send-new-log", (data) => {
    socket.broadcast.emit("new-log", data)
  })
  socket.on("create-new-task", (data) => {
    socket.broadcast.emit("new-task", data)
  })
  socket.on('disconnect', () =>{
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
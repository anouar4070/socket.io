import express from "express";
import dbConnection from "./database/dbConnections.js";

import { Server } from "socket.io";
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

dbConnection();

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

// const io = new Server(server)

const io = new Server(server, {
  cors: "*", // "*" means that any origin can connect to the Socket.IO server
});

io.on("connection", (socket) => {
  // when the user enter from front-end, his socket.id will be console logged
  console.log("welcome from sockets", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  })

  socket.on("newMessage", data => {
    console.log(data)
    // socket.emit("replay", "thanks, well received!")
    // socket.emit("replay", data) 
     socket.broadcast.emit("replay", data)
    // io.emit("replay", data)
     // io.to().emit("replay", data)
})
  
socket.on("UserTyping", (data) => {
  console.log('typing')
  socket.broadcast.emit("typing", "typing")
})

socket.on("stopTyping", (data) => {
  console.log('stopTyping')
  socket.broadcast.emit("stopUserTyping", "")
})

});

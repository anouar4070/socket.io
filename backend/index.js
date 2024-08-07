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
    socket.emit("replay", data)

  })
  
});

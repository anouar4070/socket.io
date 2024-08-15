import express from "express";
import dbConnection from "./database/dbConnections.js";

import { Server } from "socket.io";
import { NoteModel } from "./models/note.model.js";

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


//*CRUD with socket
io.on("connection", (socket) => {

socket.on("addNote", async(data) => {
  console.log(data)
  await NoteModel.insertMany(data) // note will be added to db
  let allNotes = await NoteModel.find({})
  socket.emit("allData" , allNotes)
})

socket.on("load", async() => {
  let allNotes = await NoteModel.find({})
  socket.emit("allData" , allNotes)
})


socket.on("deleteNote", async(data) => {
  await NoteModel.findByIdAndDelete(data)
  let allNotes = await NoteModel.find({})
  console.log(allNotes)
  socket.emit("allData" , allNotes)
})


})










// io.on("connection", (socket) => {
//   // when the user enter from front-end, his socket.id will be console logged
//   console.log("welcome from sockets", socket.id);

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   })

//   socket.on("newMessage", data => {
//     console.log(data)
//     // socket.emit("replay", "thanks, well received!")
//     // socket.emit("replay", data) 
//      socket.broadcast.emit("replay", data)
//     // io.emit("replay", data)
//      // io.to().emit("replay", data)
// })
  
// socket.on("UserTyping", (data) => {
//   console.log('typing')
//   socket.broadcast.emit("typing", "typing")
// })

// socket.on("stopTyping", (data) => {
//   console.log('stopTyping')
//   socket.broadcast.emit("stopUserTyping", "")
// })

// });

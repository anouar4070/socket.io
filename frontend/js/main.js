const socket = io("http://localhost:3000/");

const myInput = document.getElementById("chatMsg");

function sendMsg() {
  let message = document.getElementById("chatMsg");
  console.log(message.value);
  socket.emit("newMessage", message.value);
  message.value = "";
}

socket.on("replay", (data) => {
  console.log(data);
  document.querySelector(
    "#test"
  ).innerHTML += `<div class="message_content">${data}</div>`;
});

myInput.addEventListener("input", function (e) {
  console.log(e.target.value);
  socket.emit("UserTyping", e.target.value);
});

myInput.addEventListener("keyup", function (e) {
  socket.emit("stopTyping", e.target.value);
});

socket.on("typing", (data) => {
  document.getElementById("typingMes").classList.replace("d-none", "d-block");
});

socket.on("stopUserTyping", (data) => {
  setTimeout(() => {
    document.getElementById("typingMes").classList.replace("d-block", "d-none");
  }, 1000);
});

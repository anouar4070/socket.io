const socket = io("http://localhost:3000/");

function sendMsg() {
  let message = document.getElementById("chatMsg");
  console.log(message.value);
  socket.emit("newMessage", message.value);
  message.value = ""
}

socket.on("replay", (data) =>
  {console.log(data);
document.querySelector(".message_content").innerText = data

  } )
var messageDataArray = JSON.parse(localStorage.getItem("messageData")) || [];
console.log(messageDataArray);
var container = document.getElementById("messagelists");

messageDataArray.forEach(function (message) {
  var messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  var messageInfo = document.createElement("div");
  messageInfo.classList.add("message-info");

  var sender = document.createElement("span");
  sender.classList.add("sender");
  sender.textContent = "Names:" + "  " + message.fullName;
  var sendere = document.createElement("span");
  sendere.classList.add("sender");
  sendere.textContent = "Senders:" + " " + message.email;
  messageInfo.appendChild(sendere);
  messageInfo.appendChild(sender);

  var messageContent = document.createElement("p");
  messageContent.classList.add("message-content");
  messageContent.textContent = "Message:  " + " " + message.message;
  var date = document.createElement("span");
  date.classList.add("date");
  date.textContent = "Date : January 15, 2023";

  var replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  var replyInput = document.createElement("input");
  replyInput.classList.add("reply-input");
  replyInput.type = "text";
  replyInput.placeholder = "Write your reply...";

  var buttonBtn = document.createElement("button");
  buttonBtn.classList.add("reply-btn");
  buttonBtn.textContent = "Reply";
  replyContainer.appendChild(replyInput);
  replyContainer.appendChild(buttonBtn);

  messageDiv.appendChild(messageInfo);
  messageDiv.appendChild(messageContent);
  messageDiv.appendChild(date);
  messageDiv.appendChild(replyContainer);
  container.appendChild(messageDiv);
});

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
  var sendere = document.createElement("span");
  sendere.classList.add("sender");
  messageInfo.appendChild(sendere);
  messageInfo.appendChild(sender);

  var messageContent = document.createElement("p");
  messageContent.classList.add("message-content");
  messageContent.textContent = message.message;
  var date = document.createElement("span");
  date.classList.add("date");

  var replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  var replyInput = document.createElement("input");
  replyInput.classList.add("reply-input");
  var buttonBtn = document.createElement("button");
  buttonBtn.classList.add("reply-btn");
  replyContainer.appendChild(replyInput);
  replyContainer.appendChild(buttonBtn);

  messageDiv.appendChild(messageInfo);
  messageDiv.appendChild(messageContent);
  messageDiv.appendChild(date);
  messageDiv.appendChild(replyContainer);
  // messageDiv.appendChild(messageInfo);
});

let token = localStorage.getItem("token");
var container = document.getElementById("messagelists");
fetch("https://my-brand-backend-ts.onrender.com/api/messages", {
  mode: "cors",
  headers: {
    Authorization: token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.data.reverse().forEach(function (message) {
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
      messageContent.textContent = "Message:  " + " " + message.messageContent;
      if (messageContent.textContent.length > 50) {
        var slicedMessage = messageContent.textContent.slice(0, 50);
        messageContent.textContent = slicedMessage;
      }
      var date = document.createElement("span");
      date.classList.add("date");
      date.textContent = message.date;
      if (date.textContent.length > 17) {
        var slicedDate = date.textContent.slice(0, 17);
        date.textContent = slicedDate;
      }

      var replyContainer = document.createElement("div");
      replyContainer.classList.add("reply-container");

      var buttonBtn = document.createElement("button");
      buttonBtn.classList.add("reply-btn");
      var mailToLink = document.createElement("a");
      mailToLink.href = "mailto:" + message.email;
      mailToLink.textContent = "Reply";

      var DeleteBtn = document.createElement("button");
      DeleteBtn.classList.add("delete-btn");
      DeleteBtn.textContent = "Delete";

      buttonBtn.appendChild(mailToLink);
      replyContainer.appendChild(buttonBtn);
      replyContainer.appendChild(DeleteBtn);

      messageDiv.appendChild(messageInfo);
      messageDiv.appendChild(messageContent);
      messageDiv.appendChild(date);
      messageDiv.appendChild(replyContainer);
      container.appendChild(messageDiv);

      DeleteBtn.addEventListener("click", function () {
        deleteMessage(message._id);
      });
    });
  });
function deleteMessage(messsageId) {
  let token = localStorage.getItem("token");
  if (confirm("Are you sure you want to delete this Message?")) {
    fetch(
      `https://my-brand-backend-ts.onrender.com/api/messages/${messsageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Message deleted:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting Message:", error);
      });
  }
}

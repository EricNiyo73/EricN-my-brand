document.getElementById("message-btn").addEventListener("click", function () {
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var messageC = document.getElementById("message").value;

  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";

  resetErrorMessages();

  var isValid = true;
  if (!fullName) {
    displayErrorMessage("nameError", "Please enter your full name");
    isValid = false;
  }
  if (!email) {
    displayErrorMessage("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(email)) {
    displayErrorMessage("emailError", "Please enter a valid email address");
    isValid = false;
  }
  if (!messageC) {
    displayErrorMessage("messageError", "Please enter your Message here");
    isValid = false;
  }

  if (isValid) {
    alert("Your message sent  successfully!");
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("messageC").value = "";
  }
});

function isValidEmail(email) {
  var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
  return emailRegex.test(email);
}
function resetErrorMessages() {
  document.getElementById("nameError").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("messageError").textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

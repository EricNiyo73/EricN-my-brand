let details = [];

getData();

function getData() {
  let data = localStorage.getItem("messageData");
  if (data) {
    details = JSON.parse(data);
  } else {
    setData();
  }
}

function setData() {
  localStorage.setItem("messageData", JSON.stringify(details));
}
function save() {
  var fullName = document.getElementById("fullName");
  var email = document.getElementById("email");
  var message = document.getElementById("message");
  let data = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
  };
  var isValid = true;
  if (!data.fullName) {
    displayErrorMessage("nameError", "Please enter your full name");
    isValid = false;
  } else {
    resetErrorMessage("nameError");
  }

  if (!data.email) {
    displayErrorMessage("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(data.email)) {
    displayErrorMessage("emailError", "Please enter a valid email address");
    isValid = false;
  } else {
    resetErrorMessage("emailError");
  }

  if (!data.message) {
    displayErrorMessage("messageError", "Please enter a message");
    isValid = false;
  } else {
    resetErrorMessage("messageError");
  }
  if (isValid) {
    details.push(data);
    setData();
    alert("Thank you for contacting us");

    fullName.value = "";
    email.value = "";
    message.value = "";
  }
}

function isValidEmail(email) {
  var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
  return emailRegex.test(email);
}
function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}
document.getElementById("message-btn").addEventListener("click", function (e) {
  e.preventDefault();
  save();
});

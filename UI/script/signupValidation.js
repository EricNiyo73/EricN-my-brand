document.getElementById("signup").addEventListener("click", function () {
  var fullName = document.getElementById("fullName").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  document.getElementById("nam").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("secret").textContent = "";

  resetErrorMessages();

  var isValid = true;
  if (!fullName) {
    displayErrorMessage("nam", "Please enter your full name");
    isValid = false;
  }

  if (!email) {
    displayErrorMessage("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(email)) {
    displayErrorMessage("emailError", "Please enter a valid email address");
    isValid = false;
  } else if (isEmailRegistered(email)) {
    displayErrorMessage(
      "emailError",
      " Sorry ,Email address is already registered"
    );
    isValid = false;
  }

  if (!password) {
    displayErrorMessage("secret", "Please enter a password");
    isValid = false;
  } else if (password.length !== 8 || !/[!@]/.test(password)) {
    displayErrorMessage(
      "secret",
      "Password must be 8 characters and contain either '@' or '!' sign"
    );
    isValid = false;
  }

  //save data
  var userData = {
    fullName: fullName,
    email: email,
    password: password,
  };
  localStorage.setItem("userData", JSON.stringify(userData));
  if (isValid) {
    alert("You have registered successfully!");
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
});

function isEmailRegistered(email) {
  var userData = JSON.parse(localStorage.getItem("userData"));
  return userData && userData.email === email;
}

function isValidEmail(email) {
  var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
  return emailRegex.test(email);
}
function resetErrorMessages() {
  document.getElementById("nam").textContent = "";
  document.getElementById("emailError").textContent = "";
  document.getElementById("secret").textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

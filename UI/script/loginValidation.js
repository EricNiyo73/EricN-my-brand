document.getElementById("login").addEventListener("click", function () {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  document.getElementById("emailError").textContent = "";
  document.getElementById("secret").textContent = "";

  resetErrorMessages();

  var isValid = true;

  if (!email) {
    displayErrorMessage("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(email)) {
    displayErrorMessage("emailError", "Please enter a valid email address");
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

  if (isValid) {
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.email === email &&
      userData.password === password
    ) {
      alert("Login successful!");
      window.location.href = "Admin/message.html";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  }
});

function isValidEmail(email) {
  var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
  return emailRegex.test(email);
}
function resetErrorMessages() {
  document.getElementById("emailError").textContent = "";
  document.getElementById("secret").textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

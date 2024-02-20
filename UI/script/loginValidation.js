document.getElementById("login").addEventListener("click", function () {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  document.getElementById("emailError").textContent = "";
  document.getElementById("secret").textContent = "";
  document.getElementById("loginError").textContent = "";

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
    var registeredUsers = JSON.parse(localStorage.getItem("userData"));
    if (registeredUsers) {
      var user = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert("Login successful!");
        // sessionStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = user.isAdmin
          ? "Admin/message.html"
          : "https://ericnmybrand.netlify.app/";
      } else {
        displayErrorMessage(
          "loginError",
          "Invalid email or password. Please try again."
        );
      }
    } else {
      displayErrorMessage(
        "loginError",
        "No registered users found. Please sign up first."
      );
    }
  }
});

function isValidEmail(email) {
  var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
  return emailRegex.test(email);
}

function logout() {
  // sessionStorage.removeItem("isLoggedIn");
  localStorage.removeItem("isLoggedIn");
  return (window.location.href = "https://ericnmybrand.netlify.app/");
}
function resetErrorMessages() {
  document.getElementById("emailError").textContent = "";
  document.getElementById("secret").textContent = "";
  document.getElementById("loginError").textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

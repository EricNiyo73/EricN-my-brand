document.getElementById("userlogin").addEventListener("click", function (e) {
  e.preventDefault();
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
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userLoggedIn", user?.fullName);
        if (email === "ericnemachine@gmail.com" && password === "ericeri@") {
          localStorage.setItem("userRole", "admin");
          window.location.href = "Admin/message.html";
        } else {
          localStorage.setItem("userRole", "user");
          // window.location.href = "/UI/index.html";
          window.location.href = "https://ericnmybrand.netlify";
        }
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
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userLoggedIn");

  return (window.location.href = "https://ericnmybrand.netlify.app/");
  // return (window.location.href = "/UI/index.html");
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

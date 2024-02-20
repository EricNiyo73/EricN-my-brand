document.getElementById("signup").addEventListener("click", function (e) {
  e.preventDefault();
  // document.getElementById("nam").textContent = "";

  // document.getElementById("emailError").textContent = "";
  // document.getElementById("secret").textContent = "";

  save();
});

let details = [];

getData();

function getData() {
  let data = localStorage.getItem("userData");
  if (data) {
    details = JSON.parse(data);
  } else {
    setData();
  }
}

function setData() {
  localStorage.setItem("userData", JSON.stringify(details));
}
function save() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var fullName = document.getElementById("fullName");

  var isValid = true;
  let userData = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    isAdmin: true,
  };

  if (!userData.fullName) {
    displayErrorMessage("nam", "Please enter your full name");
    isValid = false;
  } else {
    resetErrorMessage("nam");
  }

  if (!userData.email) {
    displayErrorMessage("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(userData.email)) {
    displayErrorMessage("emailError", "Please enter a valid email address");
    isValid = false;
  } else if (isEmailRegistered(userData.email)) {
    displayErrorMessage(
      "emailError",
      " Sorry ,Email address is already registered"
    );
    isValid = false;
  } else {
    resetErrorMessage("emailError");
  }

  if (!userData.password) {
    displayErrorMessage("secret", "Please enter a password");
    isValid = false;
  } else if (
    userData.password.length !== 8 ||
    !/[!@]/.test(userData.password)
  ) {
    displayErrorMessage(
      "secret",
      "Password must be 8 characters and contain either '@' or '!' sign"
    );
    isValid = false;
  } else {
    resetErrorMessage("secret");
  }
  if (isValid) {
    details.push(userData);
    setData();
    alert("You have registered successfully!");
    fullName.value = "";
    email.value = "";
    password.value = "";
  }
}
function isEmailRegistered(email) {
  let registeredUsers = JSON.parse(localStorage.getItem("userData"));
  if (registeredUsers) {
    return registeredUsers.some((user) => user.email === email);
  } else {
    return false;
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

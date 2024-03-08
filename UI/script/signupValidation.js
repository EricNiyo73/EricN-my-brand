document.getElementById("registering").addEventListener("submit", function (e) {
  e.preventDefault();
  save();
});

function save() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var fullName = document.getElementById("fullName");

  let userData = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };

  if (!userData.fullName) {
    displayErrorMessage("nam", "Please enter your full name");
    return;
  }
  resetErrorMessage("nam");

  if (!userData.email) {
    displayErrorMessage("emailError", "Please enter your email address");
    return;
  } //else if (!isValidEmail(userData.email)) {
  //   displayErrorMessage("emailError", "Please enter a valid email address");
  //   return;
  // }
  resetErrorMessage("emailError");

  if (!userData.password) {
    displayErrorMessage("secret", "Please enter a password");
    return;
  } else if (userData.password.length < 8) {
    displayErrorMessage(
      "secret",
      "Password must be at least 8 characters long"
    );
    return;
  }
  resetErrorMessage("secret");

  fetch("https://my-brand-backend-ts.onrender.com/api/users/signup", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 409) {
        throw new Error("Email already exists");
      } else if (response.status === 400) {
        throw new Error('"email" must be a valid email');
      } else {
        throw new Error("Failed to register");
      }
    })
    .then((user) => {
      console.log("User registered successfully:", user);
      window.location.href = "../Pages/Login.html";
      alert("You have registered successfully!");
      fullName.value = "";
      email.value = "";
      password.value = "";
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (error.message === "Email already exists") {
        displayErrorMessage(
          "emailError",
          "Email address is already registered"
        );
      } else if (error.message === '"email" must be a valid email') {
        displayErrorMessage("emailError", "Please enter a valid email address");
      } else {
        displayErrorMessage(
          "signupError",
          "Failed to register. Please try again later."
        );
      }
    });
}

function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

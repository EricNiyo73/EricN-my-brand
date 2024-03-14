let login = document.getElementById("logingin");
login.addEventListener("submit", async function (e) {
  e.preventDefault();
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  let user = {
    email: email.value.trim(),
    password: password.value.trim(),
  };
  if (!user.email) {
    displayErrorMessage("emailError", "Please enter your email address");
    return;
  }
  resetErrorMessage("emailError");

  if (!user.password) {
    displayErrorMessage("passwordError", "Please enter a password");
    return;
  } else if (user.password.length < 8) {
    displayErrorMessage(
      "passwordError",
      "Password must be at least 8 characters long"
    );
    return;
  }
  resetErrorMessage("passwordError");
  document.getElementById("loader").style.display = "block";

  fetch("https://my-brand-backend-ts.onrender.com/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error('"email" must be a valid email');
      } else {
        throw new Error("Failed to Login");
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userLoggedIn", data.fullName);
        if (data.UserRole === "user") {
          localStorage.setItem("userRole", "user");
          window.location.href = "../index.html";
        } else {
          localStorage.setItem("userRole", "admin");
          window.location.href = "Admin/allBlogs.html";
        }
      } else {
        displayErrorMessage(
          "loginError",
          "Invalid email or password. Please try again."
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (error.message === '"email" must be a valid email') {
        displayErrorMessage("emailError", "Please enter a valid email address");
      } else {
        displayErrorMessage(
          "loginError",
          "Invalid email or password. Please try again."
        );
      }
    })
    .finally(() => {
      document.getElementById("loader").style.display = "none";
    });
});

// function save() {

// }
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("token");

  return (window.location.href = "https://ericnmybrand.netlify.app/");
  // return (window.location.href = "/UI/index.html");
}
function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

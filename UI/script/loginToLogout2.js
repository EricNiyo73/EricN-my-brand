// ======================change LOGIN TO LOGOUT========================

function ToChangeLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("loginLink");

  if (isLoggedIn) {
    loginLink.innerHTML = '<a href="#" id="logout">LOGOUT</a>';
    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("token");
      ToChangeLoginStatus();
    });
  } else {
    loginLink.innerHTML = '<a href="./Login.html">LOGIN</a>';
  }
}

ToChangeLoginStatus();

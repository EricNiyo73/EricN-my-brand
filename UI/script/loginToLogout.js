// ======================change LOGIN TO LOGOUT========================

function ToChangeLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginLink = document.getElementById("loginLink");
  // const isLoggedOut = document.getElementsByClassName;

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
    loginLink.innerHTML = '<a href="./Pages/Login.html">LOGIN</a>';
  }
}

ToChangeLoginStatus();

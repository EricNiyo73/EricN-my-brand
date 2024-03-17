// ======================change LOGIN TO LOGOUT========================

function ToChangeLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const desktopLoginLink = document.getElementById("desktopLoginLink");
  const mobileLoginLink = document.getElementById("mobileLoginLink");

  if (isLoggedIn) {
    desktopLoginLink.innerHTML =
      '<a href="#" id="logout" onclick="logout()">LOGOUT</a>';
    mobileLoginLink.innerHTML =
      '<a href="#" id="logout" onclick="logout()">LOGOUT</a>';
    document.getElementById("logout").addEventListener("click", function () {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userLoggedIn");
      localStorage.removeItem("token");
      ToChangeLoginStatus();
    });
  } else {
    desktopLoginLink.innerHTML = '<a href="./Login.html">LOGIN</a>';
    mobileLoginLink.innerHTML = '<a href="./Login.html">LOGIN</a>';
  }
}

ToChangeLoginStatus();
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("token");

  return (window.location.href = "https://ericnmybrand.netlify.app/");
  // return (window.location.href = "/UI/index.html");
}

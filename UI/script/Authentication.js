function checkAuthentication() {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
}

function checkAdmin() {
  var isAdmin = localStorage.getItem("userRole");
  return isAdmin === "admin";
}

function redirectToLoginPage() {
  window.location.href = "../Login.html";
}

function checkAccessToAdminPage() {
  if (!checkAuthentication() || !checkAdmin()) {
    redirectToLoginPage();
  }
}

checkAccessToAdminPage();

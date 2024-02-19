// Function to set the authentication status in local storage
function setAuthenticationStatus(isLoggedIn) {
  localStorage.setItem("isLoggedIn", isLoggedIn);
}

// Function to check the authentication status from local storage
function checkAuthentication() {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true"; // Convert string to boolean
}

// Redirect unauthenticated users
function redirectToLoginPage() {
  window.location.href = "login.html";
}

// Check access to adminMessage.html page
function checkAccessToAdminMessagePage() {
  if (!checkAuthentication()) {
    redirectToLoginPage();
  }
}

// Call the function to check access when the page loads
checkAccessToAdminMessagePage();

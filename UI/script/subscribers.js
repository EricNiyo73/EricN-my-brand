document.getElementById("sub-btn").addEventListener("click", function (e) {
  var subscribers = document.getElementById("sub-input").value;

  document.getElementById("sub-errors").textContent = "";
  var isValid = true;

  if (!subscribers) {
    displayErrorMessage("sub-errors", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(subscribers)) {
    displayErrorMessage("sub-errors", "Please enter a valid email address");
    isValid = false;
  }

  if (isValid) {
    alert("Thank you for your subscription!");
    document.getElementById("subscribers").value = "";
  }
});

function isValidEmail(subscribers) {
  var emailRegex = /^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
  return emailRegex.test(subscribers);
}
function resetErrorMessages() {
  document.getElementById("sub-errors").textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

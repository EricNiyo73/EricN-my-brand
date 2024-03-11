document
  .getElementById("sub-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    var email = document.getElementById("sub-input").value;

    resetErrorMessages();
    var isValid = true;

    if (!email) {
      displayErrorMessage("sub-errors", "Please enter your email address");
      isValid = false;
    } else if (!isValidEmail(email)) {
      displayErrorMessage("sub-errors", "Please enter a valid email address");
      isValid = false;
    }
    if (isValid) {
      try {
        const response = await fetch(
          "https://my-brand-backend-ts.onrender.com/api/subscribe/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (response.ok) {
          alert("Thank you for your subscription!");
          document.getElementById("sub-input").value = "";
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to subscribe");
        }
      } catch (error) {
        console.error("Error:", error.message);
        displayErrorMessage(
          "sub-errors",
          "Failed to subscribe. Please try again later."
        );
      }
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

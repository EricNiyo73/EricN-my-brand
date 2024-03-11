document
  .getElementById("message-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    var fullName = document.getElementById("fullName");
    var email = document.getElementById("email");
    var messageContent = document.getElementById("message");
    let data = {
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      messageContent: messageContent.value.trim(),
    };
    var isValid = true;
    if (!data.fullName) {
      displayErrorMessage("nameError", "Please enter your full name");
      isValid = false;
    } else {
      resetErrorMessage("nameError");
    }

    if (!data.email) {
      displayErrorMessage("emailError", "Please enter your email address");
      isValid = false;
    } else if (!isValidEmail(data.email)) {
      displayErrorMessage("emailError", "Please enter a valid email address");
      isValid = false;
    } else {
      resetErrorMessage("emailError");
    }

    if (!data.messageContent) {
      displayErrorMessage("messageError", "Please enter a message");
      isValid = false;
    } else {
      resetErrorMessage("messageError");
    }
    if (isValid) {
      try {
        document.getElementById("loader").style.display = "block";

        const response = await fetch(
          "https://my-brand-backend-ts.onrender.com/api/messages/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          alert("Thank you for contacting us");

          document.getElementById("fullName").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
          resetErrorMessage("message-errors");
        } else if (response.status === 400) {
          throw new Error(
            '"messageContent" length must be at least 10 characters long'
          );
        } else {
          throw new Error("Failed to message us");
        }
      } catch (error) {
        console.error("Error:", error.message);
        if (
          error.message ===
          '"messageContent" length must be at least 10 characters long'
        ) {
          displayErrorMessage(
            "message-errors",
            "Must be at least 10 characters long "
          );
        } else {
          displayErrorMessage(
            "message-errors",
            "Failed to message us. Please try again later."
          );
        }
      } finally {
        document.getElementById("loader").style.display = "none";
      }
    }
  });

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

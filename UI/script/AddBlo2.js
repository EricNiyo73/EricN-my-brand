function save() {
  let title = document.getElementById("title").value.trim();
  let description = document.getElementById("description").value.trim();
  let image = document.getElementById("image").files[0];

  var isValid = true;

  if (!title) {
    displayErrorMessage("titleError", "Please enter a blog title");
    isValid = false;
  } else {
    resetErrorMessage("titleError");
  }

  if (!description) {
    displayErrorMessage("descriptionError", "Please enter a blog description");
    isValid = false;
  } else {
    resetErrorMessage("descriptionError");
  }

  if (!image) {
    displayErrorMessage("imageError", "Please select an image");
    isValid = false;
  } else {
    resetErrorMessage("imageError");
  }

  if (isValid) {
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    let token = localStorage.getItem("token");

    fetch("https://my-brand-backend-ts.onrender.com/api/blogs/create", {
      mode: "cors",
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Blog added successfully!");
          window.location.href = ".././Pages/Admin/allBlogs.html";
        } else {
          throw new Error("Failed to add blog");
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
        displayErrorMessage(
          "blogerror",
          "Failed to add blog. Please try again later."
        );
      });
  }
}

function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

document.getElementById("addblog").addEventListener("submit", function (e) {
  e.preventDefault();
  save();
});

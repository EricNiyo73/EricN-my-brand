document.getElementById("addBlog").addEventListener("click", function () {
  var title = document.getElementById("blogTitle").value;
  var description = document.getElementById("blogDescription").value;
  var imageFile = document.getElementById("blogImage").files[0];

  resetErrorMessages();

  var isValid = true;
  if (!title) {
    displayErrorMessage("titleError", "Please enter a blog title");
    isValid = false;
  }
  if (!description) {
    displayErrorMessage("descriptionError", "Please enter a blog description");
    isValid = false;
  }
  if (!imageFile) {
    displayErrorMessage("imageError", "Please select an image");
    isValid = false;
  }

  if (isValid) {
    console.log("Blog Title:", title);
    console.log("Blog Description:", description);
    console.log("Image File:", imageFile);
    var blogDataArray = JSON.parse(localStorage.getItem("blogDataArray")) || [];

    var imageFileName = generateUniqueFileName(imageFile.name);

    var newBlogEntry = {
      title: title,
      description: description,
      image: imageFileName,
    };
    blogDataArray.push(newBlogEntry);

    localStorage.setItem("blogDataArray", JSON.stringify(blogDataArray));

    document.getElementById("blogTitle").value = "";
    document.getElementById("blogDescription").value = "";
    document.getElementById("blogImage").value = "";

    alert("Blog added successfully!");
  }
});

function resetErrorMessages() {
  document.getElementById("titleError").textContent = "";
  document.getElementById("descriptionError").textContent = "";
  document.getElementById("imageError").textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

function generateUniqueFileName(originalFileName) {
  var timestamp = new Date().getTime();

  var fileExtensionIndex = originalFileName.lastIndexOf(".");
  var fileExtension =
    fileExtensionIndex !== -1 ? originalFileName.slice(fileExtensionIndex) : "";

  var uniqueFileName =
    originalFileName.slice(0, fileExtensionIndex) +
    "-" +
    timestamp +
    fileExtension;
  return uniqueFileName;
}

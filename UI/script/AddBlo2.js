let details = [];

getData();

function getData() {
  let data = localStorage.getItem("blogs");
  if (data) {
    details = JSON.parse(data);
  } else {
    setData();
  }
}

function setData() {
  localStorage.setItem("blogs", JSON.stringify(details));
}

let blogImage = document.getElementById("blogImage");
let image = "";

blogImage.addEventListener("change", (e) => {
  const img = e.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(img);

  reader.addEventListener("load", () => {
    image = reader.result;
  });
});
let id = 1;
if (details.length > 0) {
  let ids = details.map((blog) => blog.id);
  id = Math.max(...ids) + 1;
}
function save() {
  let blogTitle = document.getElementById("blogTitle");
  let blogContent = document.getElementById("blogDescription");

  resetErrorMessages();

  var isValid = true;
  let data = {
    id: id,
    blogTitle: blogTitle.value.trim(),
    blogContent: blogContent.value.trim(),
    image: image,
  };
  if (!data.blogTitle) {
    displayErrorMessage("titleError", "Please enter a blog title");
    isValid = false;
  }
  if (!data.blogContent) {
    displayErrorMessage("descriptionError", "Please enter a blog description");
    isValid = false;
  }
  if (!data.blogTitle) {
    displayErrorMessage("imageError", "Please select an image");
    isValid = false;
  }
  if (isValid) {
    details.push(data);
    setData();
    blogTitle.value = "";
    blogContent.value = "";
    image = "";
  }
}

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
document.getElementById("addBlog").addEventListener("click", function (e) {
  e.preventDefault();
  save();
});

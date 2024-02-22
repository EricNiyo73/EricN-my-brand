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

function save() {
  let blogTitle = document.getElementById("blogTitle");
  let blogContent = document.getElementById("blogDescription");
  let comments = [];
  // resetErrorMessages();
  let id = 1;
  if (details.length > 0) {
    let ids = details.map((blog) => blog.id);
    id = Math.max(...ids) + 1;
  }
  var isValid = true;
  let data = {
    id: id,
    blogTitle: blogTitle.value.trim(),
    blogContent: blogContent.value.trim(),
    image: image,
    comments: comments,
  };
  if (!data.blogTitle) {
    displayErrorMessage("titleError", "Please enter a blog title");
    isValid = false;
  } else {
    resetErrorMessage("titleError");
  }

  if (!data.blogContent) {
    displayErrorMessage("descriptionError", "Please enter a blog description");
    isValid = false;
  } else {
    resetErrorMessage("descriptionError");
  }

  if (!data.blogTitle) {
    displayErrorMessage("imageError", "Please select an image");
    isValid = false;
  } else {
    resetErrorMessage("imageError");
  }
  if (isValid) {
    details.push(data);
    setData();
    blogTitle.value = "";
    blogContent.value = "";
    image = "";
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
document.getElementById("addBlog").addEventListener("click", function (e) {
  e.preventDefault();
  save();
});

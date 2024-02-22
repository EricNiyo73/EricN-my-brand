document.getElementById("commentHere").addEventListener("click", function (e) {
  e.preventDefault();
  save();
});

let comments = [];
var queryParams = new URLSearchParams(window.location.search);
var blogId = queryParams.get("id");
getData();

function getData() {
  let data = localStorage.getItem("UserComments");
  if (data) {
    comments = JSON.parse(data);
  } else {
    setData();
  }
}

function setData() {
  localStorage.setItem("UserComments", JSON.stringify(comments));
}
function save() {
  //   var Cauthor = document.getElementById("Cauthor");
  var comment = document.getElementById("comment");
  var fullName = document.getElementById("fullName");

  let commentId = 1;
  if (comments.length > 0) {
    let ids = details.map((blog) => blog.commentId);
    commentId = Math.max(...ids) + 1;
  }
  var isValid = true;
  let UserComments = {
    fullName: fullName.value.trim(),
    blogId: blogId,
    commentId: commentId,
    comment: comment.value.trim(),
  };

  if (!UserComments.blogId) {
    alert("blog id not found");
    isValid = false;
  }
  if (!UserComments.comment) {
    alet("Please enter a comment");
    isValid = false;
  }
  if (isValid) {
    comments.push(UserComments);
    setData();
    alert("You have commented  successfully!");
    fullName.value = "";
    comment.value = "";
  }
}

document.getElementById("commentHere").addEventListener("click", function () {
  if (!checkloggedIn()) {
    window.location.href = "../Login.html";
    return;
  }

  var commentText = document.getElementById("comment").value;

  if (!commentText.trim()) {
    alert("Please enter a comment.");
    return;
  }

  var queryParams = new URLSearchParams(window.location.search);
  var blogId = queryParams.get("id");

  var selectedBlog = getBlogById(blogId);

  if (!selectedBlog) {
    alert("Blog not found.");
    return;
  }

  // Add the comment to the selected blog
  selectedBlog.comments.push({
    text: commentText,
    // You can also store additional information such as the user who posted the comment, timestamp, etc.
  });

  // Save the updated blog
  updateBlog(selectedBlog);

  alert("Comment added successfully!");
  //   window.location.reload();
});

// Function to retrieve the selected blog by ID
function getBlogById(blogId) {
  var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  return blogs.find(function (blog) {
    return blog.id === blogId;
  });
}

// Function to update the selected blog in the data store
function updateBlog(updatedBlog) {
  var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  var index = blogs.findIndex(function (blog) {
    return blog.id === updatedBlog.id;
  });
  if (index !== -1) {
    blogs[index] = updatedBlog;
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
}
function checkloggedIn() {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  return isLoggedIn === "true";
}

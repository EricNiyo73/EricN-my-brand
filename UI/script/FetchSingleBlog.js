document.addEventListener("DOMContentLoaded", function () {
  var queryParams = new URLSearchParams(window.location.search);
  var blogId = queryParams.get("id");

  console.log("Blog ID:", blogId);

  var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  console.log("Blogs array:", blogs);

  var blog = blogs.find(function (blog) {
    return blog.id === parseInt(blogId);
  });

  if (blog) {
    var leftContainer = document.querySelector(".left-single-container");

    var blogImage = document.createElement("div");
    blogImage.classList.add("blog-image");
    var img = document.createElement("img");
    img.src = blog.image;
    img.alt = "Blog Image";
    blogImage.appendChild(img);

    var blogTitle = document.createElement("div");
    blogTitle.classList.add("blog-title");
    blogTitle.innerHTML = "<h2>" + blog.blogTitle + "</h2>";

    var blogDescription = document.createElement("div");
    blogDescription.classList.add("blog-description");
    blogDescription.innerHTML = blog.blogContent;

    leftContainer.appendChild(blogImage);
    leftContainer.appendChild(blogTitle);
    leftContainer.appendChild(blogDescription);

    if (!document.getElementById("commentForm")) {
      var commentForm = document.createElement("div");
      commentForm.classList.add("comment-form");
      commentForm.id = "commentForm";

      var ToEnterName = document.createElement("div");
      ToEnterName.classList.add("commentorName");

      var commentorInput = document.createElement("input");
      commentorInput.type = "text";
      commentorInput.id = "fullName";

      ToEnterName.appendChild(commentorInput);

      var commentEmpty = document.createElement("div");
      var label = document.createElement("label");
      label.textContent = "Comment:";

      var textarea = document.createElement("textarea");
      textarea.id = "comment";
      textarea.name = "comment";
      textarea.rows = "4";
      textarea.required = true;

      var button = document.createElement("input");
      button.type = "button";
      button.id = "commentHere";
      button.value = "Add Comment";
      commentEmpty.appendChild(label);
      commentEmpty.appendChild(textarea);
      commentEmpty.appendChild(button);

      commentForm.appendChild(ToEnterName);
      commentForm.appendChild(commentEmpty);

      leftContainer.appendChild(commentForm);
    }
    displayComments(blogId);
  } else {
    console.error("Blog not found!");
  }

  document
    .getElementById("commentHere")
    .addEventListener("click", function (e) {
      e.preventDefault();
      saveComment(blogId);
    });

  function displayComments(blogId) {
    var comments = JSON.parse(localStorage.getItem("UserComment")) || [];
    var blogComments = comments.filter(function (comment) {
      return comment.blogId === parseInt(blogId);
    });
    var commentsContainer = document.createElement("div");
    commentsContainer.classList.add("comments-container");
    blogComments.forEach(function (comment) {
      var commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-commentor");

      var commentorDiv = document.createElement("div");
      commentorDiv.classList.add("commentor");

      var userIcon = document.createElement("span");
      userIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
      var username = document.createElement("span");
      username.textContent = comment.fullName;
      commentorDiv.appendChild(userIcon);
      commentorDiv.appendChild(username);

      var commentContentDiv = document.createElement("div");
      commentContentDiv.classList.add("comment");
      commentContentDiv.textContent = comment.comment;

      commentDiv.appendChild(commentorDiv);
      commentDiv.appendChild(commentContentDiv);
      commentsContainer.appendChild(commentDiv);
    });
    leftContainer.appendChild(commentsContainer);
  }

  function saveComment(blogId) {
    var comment = document.getElementById("comment");
    var fullName = document.getElementById("fullName");

    var commentId = 1;
    var comments = JSON.parse(localStorage.getItem("UserComment")) || [];
    if (comments.length > 0) {
      var ids = comments.map((comment) => comment.commentId);
      commentId = Math.max(...ids) + 1;
    }

    var isValid = true;
    var newComment = {
      fullName: fullName.value.trim(),
      blogId: parseInt(blogId),
      commentId: commentId,
      comment: comment.value.trim(),
    };

    if (!newComment.blogId) {
      alert("Blog id not found");
      isValid = false;
    }
    if (!newComment.comment) {
      alert("Please enter a comment");
      isValid = false;
    }

    if (isValid) {
      comments.push(newComment);
      localStorage.setItem("UserComment", JSON.stringify(comments));
      alert("Thank You!");
      fullName.value = "";
      comment.value = "";
      displayComments(blogId);
    }
  }
});

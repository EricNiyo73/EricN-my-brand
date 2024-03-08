// let loadingWaiting = `<style>
// .loader {
//   border: 4px solid rgba(0, 0, 0, 0.1);
//   border-left-color: #007bff; /* Adjust color as needed */
//   border-radius: 50%;
//   width: 40px;
//   height: 40px;
//   animation: spin 1s linear infinite;
//   margin: 0 auto;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

//   </style>
//   </head>
//   <body>
//   <div class="loader" style="margin-left:20%;"></div>
//   `;

document.addEventListener("DOMContentLoaded", function () {
  var queryParams = new URLSearchParams(window.location.search);
  var blogId = queryParams.get("id");

  console.log("Blog ID:", blogId);
  fetch(`https://my-brand-backend-ts.onrender.com/api/blogs/${blogId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let blog = data.data;
      var leftContainer = document.querySelector(".left-single-container");
      var blogImage = document.createElement("div");
      blogImage.classList.add("blog-image");
      var img = document.createElement("img");
      img.src = blog.image;
      img.alt = "Blog Image";
      blogImage.appendChild(img);

      var blogTitle = document.createElement("div");
      blogTitle.classList.add("blog-title");
      blogTitle.innerHTML = "<h2>" + blog.title + "</h2>";

      var blogDescription = document.createElement("div");
      blogDescription.classList.add("blog-description");
      blogDescription.innerHTML = blog.description;

      var likesContainer = document.createElement("div");
      likesContainer.classList.add("likes-container");
      var likeButton = document.createElement("button");
      likeButton.classList.add("like-button");
      likeButton.textContent = "Like";
      likesContainer.appendChild(likeButton);
      var likesCount = document.createElement("span");
      likesCount.classList.add("likes-count");
      likesCount.textContent = blog.likes;
      likesContainer.appendChild(likesCount);
      var likeError = document.createElement("p");
      likeError.id = "likeError";

      leftContainer.appendChild(blogImage);
      leftContainer.appendChild(blogTitle);
      leftContainer.appendChild(blogDescription);
      leftContainer.appendChild(likesContainer);
      leftContainer.appendChild(likeError);
      if (!document.getElementById("commentForm")) {
        var commentForm = document.createElement("div");
        commentForm.classList.add("comment-form");
        commentForm.id = "commentForm";

        var ToEnterName = document.createElement("div");
        ToEnterName.classList.add("commentorName");

        var userFullName = localStorage.getItem("userLoggedIn");
        if (userFullName) {
          var commentorNameDisplay = document.createElement("div");
          commentorNameDisplay.textContent = "Welcome: " + userFullName;
          ToEnterName.appendChild(commentorNameDisplay);
        } else {
          var commentorInput = document.createElement("a");
          commentorInput.classList.add("loginFirst");
          commentorInput.textContent = "Login To Comment";
          commentorInput.href = `./Login.html`;

          // commentorInput.placeholder = "Your Name";
          ToEnterName.appendChild(commentorInput);
        }

        var commentEmpty = document.createElement("div");
        commentEmpty.classList.add("fieldtocomment");
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
        var commentError = document.createElement("p");
        commentError.id = "commentError";
        commentEmpty.appendChild(label);
        commentEmpty.appendChild(textarea);
        commentEmpty.appendChild(button);
        commentEmpty.appendChild(commentError);

        commentForm.appendChild(ToEnterName);
        commentForm.appendChild(commentEmpty);

        leftContainer.appendChild(commentForm);

        // ==========================================
      }
      // =================================================
      for (var i = blog.comments.length - 1; i >= 0; i--) {
        var commentsContainer = document.createElement("div");
        commentsContainer.classList.add("comments-container");

        var commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-commentor");

        var commentorDiv = document.createElement("div");
        commentorDiv.classList.add("commentor");

        var userIcon = document.createElement("span");
        userIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
        var username = document.createElement("span");
        username.textContent = blog.comments[i].fullName;
        commentorDiv.appendChild(userIcon);
        commentorDiv.appendChild(username);

        var commentContentDiv = document.createElement("div");
        commentContentDiv.classList.add("comment");
        commentContentDiv.textContent = blog.comments[i].comment;

        commentDiv.appendChild(commentorDiv);
        commentDiv.appendChild(commentContentDiv);
        leftContainer.appendChild(commentsContainer);
        commentsContainer.appendChild(commentDiv);
      }
      document
        .getElementById("commentHere")
        .addEventListener("click", function (e) {
          e.preventDefault();
          var comment = document.getElementById("comment").value;
          if (!comment) {
            displayErrorMessage("commentError", "Enter your comment");
            return;
          }
          resetErrorMessage("commentError");
          let token = localStorage.getItem("token");
          fetch(
            `https://my-brand-backend-ts.onrender.com/api/com/like/add-comment/${blogId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
              body: JSON.stringify({ comment }),
            }
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else if (response.status === 401) {
                throw new Error("Invalid token");
              } else {
                throw new Error("Failed to comment");
              }
            })
            .then((data) => {
              console.log(
                " hhhh let me check a Comment added successfully:",
                data
              );
              location.reload();
            })
            .catch((error) => {
              console.error("Error adding comment:", error);
              if (error.message === "Invalid token") {
                displayErrorMessage("commentError", "Please Login to Comment");
              } else {
                displayErrorMessage(
                  "commentError",
                  "Failed to comment. Please try again later."
                );
              }
            });
        });

      document
        .querySelector(".like-button")
        .addEventListener("click", function () {
          let token = localStorage.getItem("token");

          fetch(
            `https://my-brand-backend-ts.onrender.com/api/com/like/like/${blogId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          )
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else if (response.status === 401) {
                throw new Error("Invalid token");
              } else if (response.status === 400) {
                throw new Error("You have already liked this blog");
              } else {
                throw new Error("Failed to like");
              }
            })
            .then((data) => {
              console.log(" let me check if Like added successfully:", data);
              // location.reload();
            })
            .catch((error) => {
              console.error("Error adding like:", error);
              if (error.message === "Invalid token") {
                displayErrorMessage("likeError", "Please Login to like");
              } else if (error.message === "You have already liked this blog") {
                displayErrorMessage(
                  "likeError",
                  "You have already liked this blog"
                );
              } else {
                displayErrorMessage(
                  "likeError",
                  "Failed to like. Please try again later."
                );
              }
            });
        });
    });
});
function resetErrorMessage(id) {
  document.getElementById(id).textContent = "";
}

function displayErrorMessage(id, message) {
  var errorMessageElement = document.getElementById(id);
  errorMessageElement.textContent = message;
  errorMessageElement.style.color = "red";
}

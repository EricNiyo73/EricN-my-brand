var blogDataArray = JSON.parse(localStorage.getItem("blogs")) || [];
// console.log(blogDataArray);
var container = document.getElementById("blogsContainer");

blogDataArray.forEach(function (blog) {
  var blogDiv = document.createElement("div");
  blogDiv.classList.add("single-blogs");

  var blogImageDiv = document.createElement("div");
  blogImageDiv.classList.add("blog-image");
  var img = document.createElement("img");
  img.src = blog.image;
  img.alt = "Blog Image";
  blogImageDiv.appendChild(img);
  blogDiv.appendChild(blogImageDiv);

  var dateCommentsDiv = document.createElement("div");
  dateCommentsDiv.classList.add("date-comments");

  var postedDateDiv = document.createElement("div");
  postedDateDiv.classList.add("posted-date");

  var clockIcon = document.createElement("i");
  clockIcon.classList.add("fas", "fa-clock");

  var timeSpan = document.createElement("span");
  timeSpan.textContent = " 21 02 2024";
  postedDateDiv.appendChild(clockIcon);
  postedDateDiv.appendChild(timeSpan);
  dateCommentsDiv.appendChild(postedDateDiv);

  var commentIconDiv = document.createElement("div");
  commentIconDiv.classList.add("comment-icon");
  var commentIcon = document.createElement("i");
  commentIcon.classList.add("far", "fa-comment");

  var comments = JSON.parse(localStorage.getItem("UserComment")) || [];
  var blogComments = comments.filter(function (comment) {
    return comment.blogId === blog.id;
  });
  var numComments = blogComments.length;
  var commentsSpan = document.createElement("span");
  commentsSpan.textContent = numComments + " Comments";

  commentIconDiv.appendChild(commentIcon);
  commentIconDiv.appendChild(commentsSpan);
  dateCommentsDiv.appendChild(commentIconDiv);
  blogDiv.appendChild(dateCommentsDiv);

  var blogTitleDiv = document.createElement("div");
  blogTitleDiv.classList.add("blog-title");
  blogTitleDiv.textContent = blog.blogTitle;
  blogDiv.appendChild(blogTitleDiv);

  var blogDescriptionDiv = document.createElement("div");
  blogDescriptionDiv.classList.add("blog-description");
  blogDescriptionDiv.textContent = blog.blogContent;
  blogDiv.appendChild(blogDescriptionDiv);

  if (blogDescriptionDiv.textContent.length > 100) {
    var slicedDescription = blogDescriptionDiv.textContent.slice(0, 100);

    slicedDescription += "...";
    blogDescriptionDiv.textContent = slicedDescription;
  }
  // console.log(slicedDescription);
  var readMoreBtnDiv = document.createElement("div");
  readMoreBtnDiv.classList.add("read-more-btn");
  var readMoreLink = document.createElement("a");
  // readMoreLink.href = "./UI/Pages/singleBlog.html";
  readMoreLink.href = `./Pages/singleBlog.html?id=${blog?.id}`;
  readMoreLink.textContent = "Read More";
  readMoreBtnDiv.appendChild(readMoreLink);
  blogDiv.appendChild(readMoreBtnDiv);
  container.appendChild(blogDiv);
});

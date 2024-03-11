// var blogs = JSON.parse(blogsData);

var blogContainer = document.getElementById("blogContainer");
fetch("https://my-brand-backend-ts.onrender.com/api/blogs", {
  mode: "cors",
})
  .then((res) => res.json())
  .then((data) => {
    data.data.reverse().forEach(function (blog) {
      var blogDiv = document.createElement("div");
      blogDiv.classList.add("single-list");

      var imageDiv = document.createElement("div");
      imageDiv.classList.add("image");
      var image = document.createElement("img");
      image.src = blog.image;
      image.alt = "Blog Image";
      imageDiv.appendChild(image);
      blogDiv.appendChild(imageDiv);

      var leftContentDiv = document.createElement("div");
      leftContentDiv.classList.add("left-content");

      var dateDiv = document.createElement("div");
      dateDiv.classList.add("date");

      var dateIcon = document.createElement("i");
      dateIcon.classList.add("fas", "fa-clock");

      var timeSpan = document.createElement("span");
      timeSpan.classList.add("time");
      timeSpan.textContent = blog.date;
      if (timeSpan.textContent.length > 17) {
        var slicedDate = timeSpan.textContent.slice(0, 17);
        timeSpan.textContent = slicedDate;
      }
      dateDiv.appendChild(dateIcon);
      dateDiv.appendChild(timeSpan);

      var blogTitleDiv = document.createElement("div");
      blogTitleDiv.classList.add("blog-title");

      var titleParagraph = document.createElement("p");
      titleParagraph.textContent = blog.title;
      blogTitleDiv.appendChild(titleParagraph);

      var actionsDiv = document.createElement("div");
      actionsDiv.classList.add("actions");

      // Create and append the "More" button
      var moreButtonDiv = document.createElement("div");
      moreButtonDiv.classList.add("more");
      var moreButton = document.createElement("button");
      moreButton.classList.add("actions-btn");
      moreButton.textContent = "More";
      moreButtonDiv.appendChild(moreButton);
      actionsDiv.appendChild(moreButtonDiv);

      // Create and append Delete
      var DeleteButtonDiv = document.createElement("div");
      DeleteButtonDiv.classList.add("delete");
      var DeleteButton = document.createElement("button");
      DeleteButton.classList.add("actions-btn");

      var deletespan = document.createElement("span");
      deletespan.textContent = "Delete";

      var deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt");
      DeleteButton.appendChild(deleteIcon);
      DeleteButton.appendChild(deletespan);

      DeleteButtonDiv.appendChild(DeleteButton);
      actionsDiv.appendChild(DeleteButtonDiv);

      //creation of edit button
      var EditButtonDiv = document.createElement("div");
      EditButtonDiv.classList.add("edit");
      var editButton = document.createElement("button");
      editButton.classList.add("actions-btn");

      // DeleteButton.textContent = "Delete";
      var editspan = document.createElement("span");
      // editspan.textContent = "Edit";

      var editlink = document.createElement("a");
      editlink.textContent = "Edit";
      editlink.href = `./editBlog.html?id=${blog?.id}`;

      editspan.appendChild(editlink);

      var editIcon = document.createElement("i");
      editIcon.classList.add("fas", "fa-pencil-alt");
      editButton.appendChild(editIcon);
      editButton.appendChild(editspan);
      EditButtonDiv.appendChild(editButton);
      actionsDiv.appendChild(EditButtonDiv);

      leftContentDiv.appendChild(dateDiv);
      leftContentDiv.appendChild(blogTitleDiv);
      leftContentDiv.appendChild(actionsDiv);

      blogDiv.appendChild(imageDiv);
      blogDiv.appendChild(leftContentDiv);

      blogContainer.appendChild(blogDiv);
      // ========================================================

      DeleteButton.dataset.id = blog.id;
      editButton.dataset.id = blog.id;

      DeleteButton.addEventListener("click", function () {
        //   var blogId = this.dataset.id;
        //   deleteBlog(blogId);
        deleteBlog("${index}");
      });
      function deleteBlog(index) {
        let BlogList;
        if (localStorage.getItem("blogs") == null) {
          BlogList = [];
        } else {
          BlogList = JSON.parse(localStorage.getItem("blogs"));
        }
        if (confirm("Are you sure you want to delete this item?")) {
          BlogList.splice(index, 1);
          localStorage.setItem("blogs", JSON.stringify(BlogList));

          location.reload();
        }
      }

      // ================================================
      editButton.addEventListener("click", function () {
        //   var blogId = this.dataset.id;
        //   deleteBlog(blogId);
        editBlog("${index}");
      });
      function editBlog(index) {
        let blogList;
        if (localStorage.getItem("blogs") == null) {
          blogList = [];
        } else {
          blogList = JSON.parse(localStorage.getItem("blogs"));
        }
      }
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  var queryParams = new URLSearchParams(window.location.search);
  var blogId = queryParams.get("id");

  if (blogId) {
    console.log("Blog ID:", blogId);
  } else {
    console.error(" hhhhh your Blog ID not found hhh");
  }
  var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  console.log(blogs);
  blogs.find(function (blog) {
    console.log("Id blog is", blog.id);

    blog.id === blogId;

    document.getElementById("title").value = blog.blogTitle;
    document.getElementById("description").value = blog.blogContent;
    // console.log(blog.blogContent);
    document.getElementById("edit").addEventListener("click", function () {
      var updatedTitle = document.getElementById("title").value;
      var updatedDescription = document.getElementById("description").value;
      blog.blogTitle = updatedTitle;
      blog.blogContent = updatedDescription;

      var index = blogs.findIndex(function (item) {
        return item.id === blogId;
      });
      console.log(index);
      if (index !== -1) {
        blogs[index] = blog;
      }

      localStorage.setItem("blogs", JSON.stringify(blogs));
      location.reload();
      // window.location.href = "/UI/Pages/Admin/allBlogs.html";
    });
  });
});

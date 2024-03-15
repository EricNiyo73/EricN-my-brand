document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  fetch(`https://my-brand-backend-ts.onrender.com/api/blogs/${blogId}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("title").value = data.data.title;
      document.getElementById("description").value = data.data.description;
    })
    .catch((error) => console.error("Error fetching blog details:", error));

  document.getElementById("edit").addEventListener("click", function () {
    const updatedBlog = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
    };

    const formData = new FormData();
    formData.append("title", updatedBlog.title);
    formData.append("description", updatedBlog.description);
    formData.append("image", document.getElementById("file").files[0]);

    let token = localStorage.getItem("token");

    document.getElementById("loader").style.display = "block";

    fetch(`https://my-brand-backend-ts.onrender.com/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Blog updated successfully:", data);
        alert("Blog updated successfully");
        window.location.reload();
        // window.location.href = "/UI/Pages/Admin/allBlogs.html";
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      })
      .finally(() => {
        document.getElementById("loader").style.display = "none";
      });
  });
});

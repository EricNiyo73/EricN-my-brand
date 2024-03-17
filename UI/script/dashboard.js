async function displayBlogs() {
  try {
    let token = localStorage.getItem("token");
    const response = await fetch(
      "https://my-brand-backend-ts.onrender.com/api/blogs",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();

    var userListTable = document
      .getElementById("blogTable")
      .getElementsByTagName("tbody")[0];
    userListTable.innerHTML = "";

    data.data.reverse().forEach(function (blog, index) {
      var row = userListTable.insertRow();
      var cellNo = row.insertCell(0);
      var cellTitle = row.insertCell(1);
      var cellComment = row.insertCell(2);
      var cellLike = row.insertCell(3);

      cellNo.textContent = index + 1;
      cellTitle.textContent = blog.title.substring(0, 40);
      cellComment.textContent = blog.comments.length;
      cellLike.textContent = blog.likes;
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}
displayBlogs();

async function NumberOfBlog() {
  try {
    let token = localStorage.getItem("token");
    const response = await fetch(
      "https://my-brand-backend-ts.onrender.com/api/blogs",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    const numberOfBlogs = data.data.length;
    const bContainer = document.getElementById("bcontainer");
    bContainer.innerHTML = `
      <div class="box">
        <h1>${numberOfBlogs}</h1>
        <h3>Blogs</h3>
      </div>
      <div class="icon-case">
        <i class="fa-solid fa-blog"></i>
      </div>`;
  } catch (error) {
    console.log(error);
  }
}
NumberOfBlog();

// ====================users===============================

async function NumberOfUsers() {
  try {
    let token = localStorage.getItem("token");
    const response = await fetch(
      "https://my-brand-backend-ts.onrender.com/api/users",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    const numberOfUsers = data.data.length;

    const uContainer = document.getElementById("ucontainer");
    uContainer.innerHTML = `
      <div class="box">
        <h1>${numberOfUsers}</h1>
        <h3>Users</h3>
      </div>
      <div class="icon-case">
       <i class="fa-solid fa-users"></i>
      </div>`;
  } catch (error) {
    console.log(error);
  }
}
NumberOfUsers();

// ===========================subscribers============================

async function NumberOfSub() {
  try {
    let token = localStorage.getItem("token");
    const response = await fetch(
      "https://my-brand-backend-ts.onrender.com/api/subscribe",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = await response.json();
    const numberOfUsers = data.data.length;

    const subContainer = document.getElementById("subcontainer");
    subContainer.innerHTML = `
      <div class="box">
        <h1>${numberOfUsers}</h1>
        <h3>Subscribers</h3>
      </div>
      <div class="icon-case">
       <i class="fa-solid fa-users"></i>
      </div>`;
  } catch (error) {
    console.log(error);
  }
}
NumberOfSub();

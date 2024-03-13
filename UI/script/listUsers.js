document.addEventListener("DOMContentLoaded", function () {
  displayUserList();
});

async function displayUserList() {
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

    var userListTable = document
      .getElementById("userTable")
      .getElementsByTagName("tbody")[0];
    userListTable.innerHTML = "";

    data.data.reverse().forEach(function (user, index) {
      var row = userListTable.insertRow();
      var cellNo = row.insertCell(0);
      var cellFullName = row.insertCell(1);
      var cellEmail = row.insertCell(2);
      var cellActions = row.insertCell(3);

      cellNo.textContent = index + 1;
      cellFullName.textContent = user.fullName;
      cellEmail.textContent = user.email;

      var updateBtn = document.createElement("button");
      updateBtn.className = "update-btn";
      updateBtn.innerHTML =
        '<i class="fas fa-pencil-alt"></i> <span>Update</span>';
      var deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML =
        '<i class="fas fa-trash-alt"></i> <span>Delete</span>';

      // updateBtn.addEventListener("click", function () {});
      // cellActions.appendChild(updateBtn);
      cellActions.appendChild(deleteBtn);
      deleteBtn.addEventListener("click", function () {
        deleteUser(user._id);
      });
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}
function deleteUser(userId) {
  let token = localStorage.getItem("token");
  if (confirm("Are you sure you want to delete this user?")) {
    fetch(`https://my-brand-backend-ts.onrender.com/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("user deleted:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
}

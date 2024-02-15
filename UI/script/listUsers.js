document.addEventListener("DOMContentLoaded", function () {
  displayUserList();
});

function displayUserList() {
  var userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  if (userData) {
    var userListTable = document
      .getElementById("userTable")
      .getElementsByTagName("tbody")[0];

    userListTable.innerHTML = "";

    for (var i = 0; i < userData.length; i++) {
      var row = userListTable.insertRow();
      var cellNo = row.insertCell(0);
      var cellFullName = row.insertCell(1);
      var cellEmail = row.insertCell(1);
      var cellActions = row.insertCell(3);

      cellNo.textContent = i + 1;

      cellFullName.textContent = userData[i].fullName;
      cellEmail.textContent = userData[i].email;

      var updateBtn = document.createElement("button");
      updateBtn.className = "update-btn";
      updateBtn.innerHTML =
        '<i class="fas fa-pencil-alt"></i> <span>Update</span>';
      var deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML =
        '<i class="fas fa-trash-alt"></i> <span>Delete</span>';

      updateBtn.addEventListener("click", function () {});
      deleteBtn.addEventListener("click", function () {});
      cellActions.appendChild(updateBtn);
      cellActions.appendChild(deleteBtn);
    }
  }
}

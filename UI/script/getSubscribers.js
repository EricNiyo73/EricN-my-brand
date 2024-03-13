document.addEventListener("DOMContentLoaded", function () {
  displaySubscibers();
});

async function displaySubscibers() {
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

    var userListTable = document
      .getElementById("subTable")
      .getElementsByTagName("tbody")[0];
    userListTable.innerHTML = "";

    data.data.reverse().forEach(function (user, index) {
      var row = userListTable.insertRow();
      var cellNo = row.insertCell(0);
      var cellEmail = row.insertCell(1);

      cellNo.textContent = index + 1;
      cellEmail.textContent = user.email;

      // var deleteBtn = document.createElement("button");
      // deleteBtn.className = "delete-btn";
      // deleteBtn.innerHTML =
      //   '<i class="fas fa-trash-alt"></i> <span>Delete</span>';

      // cellActions.appendChild(deleteBtn);
      // deleteBtn.addEventListener("click", function () {
      //   deleteSub(user._id);
      // });
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

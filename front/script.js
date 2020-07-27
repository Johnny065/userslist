//users
fetch('http://localhost:3000').then(res =>
  res.json().then(data => buildDiv(data))
);

const buildDiv = data => {
  const div = document.getElementById('users');
  data.forEach(element => {
    div.innerHTML += `<div id="cardId${element.id}" class="card border-light m-1 col-12">
  <div class="card-header">${element.name}</div>
  <div class="card-body">
    <h5 class="card-title">${element.username}</h5>
    <p class="card-text">${element.email}</p>
        <p class="card-text">${element.city}</p>
    <p class="card-text">${element.website}</p>
        <p class="card-text">${element.phone}</p>
        <button onclick="deleteReq(${element.id})" class="btn btn-sm btn-danger">Delete user</button>
        <button onclick="editUser(${element.id})" id="editUserBtn${element.id}" class="btn btn-sm btn-secondary">Edit user</button>
        <div id="updateUserForm${element.id}">
        </div>
        </div>
</div>`;
  });
};

//add new user - show form
const showBtn = document.getElementById('showForm');
const userForm = document.getElementById('userForm');

function showFormBtn() {
  if ((showBtn.innerText = 'Add new user')) {
    userForm.innerHTML = `<form action="http://localhost:3000" method="POST" class="m-2">
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputName">Name</label>
      <input type="text" class="form-control" id="inputName" name="name" placeholder="Name">
    </div>
    <div class="form-group col-md-6">
      <label for="inputUsername">Username</label>
      <input type="text" class="form-control" id="inputUsername" name="username" placeholder="Username">
    </div>
    <div class="form-group col-md-12">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" name="email" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputCity">City</label>
    <input type="text" class="form-control" id="inputCity" name="city" placeholder="New York">
  </div>
  <div class="form-group">
    <label for="inputWebsite">Website</label>
    <input type="website" class="form-control" id="inputWebsite" name="website" placeholder="yoursite.com">
  </div>
    <div class="form-group">
    <label for="inputPhone">Phone number</label>
    <input type="text" class="form-control" id="inputPhone" name="phone" placeholder="(+972)52-123-4567">
  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck" required>
      <label class="form-check-label" for="gridCheck">
        Are you sure?
      </label>
    </div>
  </div>
  <button type="submit" class="btn btn-primary col-12">Add user!</button>
</form>`;
    showBtn.remove();
  }
}

//edit users name
function editUser(id) {
  const editUserBtn = document.getElementById(`editUserBtn${id}`);
  const updateUserDiv = document.getElementById(`updateUserForm${id}`);
  editUserBtn.innerText = 'Cancel';
  if (editUserBtn.innerText == 'Cancel') {
    updateUserDiv.innerHTML = `
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="prop">Name</label>
      <input type="text" class="form-control" id="updateNameInput${id}" name="updateNameInput" placeholder="Name">
    </div>
  <button onclick="putRequest(updateNameInput${id}.value, ${id})" class="btn btn-primary col-12">Update user!</button>
`;
  }
}

//delete request
function deleteReq(idd) {
  $.ajax({
    url: `http://localhost:3000/${idd}`,
    method: 'DELETE',
    data: {
      id: idd
    },
    success: function (result) {
      console.log('ok');
    },
    error: function (result) {
      console.log('error');
    }
  });
}

//put request
function putRequest(inputValue, idd) {
  $.ajax({
    url: 'http://localhost:3000',
    method: 'PUT',
    data: {
      id: idd,
      prop: 'name',
      val: inputValue
    },
    success: function (result) {
      alert('ok');
    },
    error: function (result) {
      alert('error');
    }
  });
}

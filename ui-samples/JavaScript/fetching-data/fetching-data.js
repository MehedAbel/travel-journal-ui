let mockedUsers = [];

// ------------------------------GET USERS------------------------------------------

const displayUserList = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(userObjects => {
        console.log(userObjects);
        mockedUsers = userObjects;
        
        updateUserList();
      })
};

const updateUserList = () => {
    let userList = document.querySelector(".user-container");
    let userItems = "";

    for (user of mockedUsers) {
        userItems += getUserItem(user);
    }
    
    userList.innerHTML = userItems;
}

const getUserItem = (user) => {
    let userItems = "";

    // add div for each user item
    userItems += '<div class="user-item">';
    // display user name
    userItems += '<span class="title">' + user.name + '</span><br/>';
    // add delete button
    userItems += '<button class="delete-btn" onclick=\'openConfirmation("' + user.name + '",' + user.id + ')\'>Delete</button> <hr />';
    
    // add user details div
    userItems += '<div class="user-details">';
    //display email
    userItems += '<span>Email: ' + user.email + '</span>';
    //display phone
    userItems += '<span>Phone: ' + user.phone + '</span>';
    //display company name
    userItems += '<span>Company name: ' + user.company.name + '</span>';

    // cloase containers user-items and user-details
    userItems += '</div></div>';

    return userItems;
}

displayUserList();


// ------------------------------DELETE AN EXISTING USER------------------------------------------

const openConfirmation = (userName, userId) => {
    if(confirm("Are you sure you want to delete the user " + userName + "?")) {
        deleteUser(userId);
    }
}

const deleteUser = (userId) => {
    console.log("userId == ", userId)
    fetch('https://jsonplaceholder.typicode.com/users/' + userId, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(res);

        if(res.ok) {
            mockedUsers = mockedUsers.filter((item) => item.id !== userId);
            updateUserList();
        }
    })
}

// ------------------------------ADD A NEW USER------------------------------------------

const form = document.querySelector("form");

const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const company = document.getElementById("company");
const para = document.querySelector("p");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (userName.value === "") {
    para.textContent = "You need to fill in user name!";
  }


fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify({
        id: mockedUsers.length + 1,
        name: userName.value,
        email: email.value,
        phone: phone.value,
        company: {
            name: company.value
        }
    }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    mockedUsers.push(json);
    updateUserList();
  });
});

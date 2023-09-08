# Step 7: Implement Edit Functionality


By this point, we need one more trick on our sleeve, that's going to be editing existing user data. Let's start implementing it:

1. Create 2 new states, editMode and currentUserId: The `editMode` will indicate if we're creating a new user or updating an existing one, think of it as our way to toggle what we will see in the app. The `currentUserId` holds the id of the user we are currently editing, it's like our identificator for that.

2. Create handleEdit function: This function will be triggered when the Edit button is clicked. It takes a user as a parameter, sets the `editMode` to true, updates `currentUserId` with the user's id, and fills the form with the user's existing data.

```jsx
  const handleEdit = (user) => {
    setEditMode(true);
    setCurrentUserId(user.userID);

    setName(user.name);
    setSurname(user.surname);
    setEmail(user.email);
    setPassword(user.password);
  };
```

3. Create handleUpdate function: This function sends a PUT request ot the server with the updated user data when the form is submitted in edit mode. Is very similar to the one with POST that we created the only difference here is that the method should be PUT and in the URL we pass the `currentUserId` (check Postman). Besides that we will update the DOM with the newest data created if the response status is ok.

4. Depending on the `editMode` if it's true or not, we use either `handleUpdate` or `handleSubmit` when the form is submitted. We do the same to change the text of the button.

5. Now when we checked Postman we can see that we can update only name and surname, for this we can hide the inputs and make a condition in the `validate` function to not check these fields.

```jsx
  const validate = () => {
    const validationErrors = {};

    if (!name) validationErrors.name = "Name is required";
    if (!surname) validationErrors.surname = "Surname is required";

    if (!editMode) {
      if (!email) {
        validationErrors.email = "Email is required";
      } else if (!email.includes("@")) {
        validationErrors.email = "Email adress is invalid";
      }
      if (!password) {
        validationErrors.password = "Password is required";
      } else if (password.length < 8) {
        validationErrors.password = "Password must be at least 8 characters";
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };


  return (
    ...

              {!editMode && (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Write your password"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Write your password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p>{errors.password}</p>}
              </div>
            </>
          )}
          ...
  )

```

And this is how we can update our data, we just need to finish this up with the DELETE method as the final step.

How we do that? We're giving our app the power to eliminate user data from the API.

1. Add a delete button: Where we're mapping let's create a delete button, we're giving this button an `onClick` event and a handler that will trigger the delete operation.
```jsx
<button onClick={() => handleDelete(u.id)}>Delete</button>
```

2. Create a handleDelete function: This is where we will craft our DELETE request. We're using the fetch function again, just like we did in our GET and POST requests, but this time with the 'DELETE' method.

3. The URL matters... a lot: Notice how we're using backticks (`) for our URL string? This allows us to stick a variable (in this case, the user ID) right in the middle of the string. That's how we tell the API exactly who we're trying to delete

4. Hook it up: Finally, we wire up our `handleDelete` function to the Delete button's `onClick` handler. The magic here is that we're using an arrow function to call `handleDelete` with the correct user ID when the button is clicked.

And that's it! You have now enough knowledge in the CRUD universe in React, Create, Read, Update and Delete.
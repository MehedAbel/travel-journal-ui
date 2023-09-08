# Step 6: Submitting in a Form with POST Request

Alright, you've got your form, you're validating inputs like a "pro" and you've fetched a bunch of users. Now is time to create a new user when someone hits the Submit Button.

1. Let's store our new user in a variable. We create a `user` object with the state variables we have on hand: `name`, `surname`, `email` and `password`.
```jsx
      const user = {
        name,
        surname,
        email,
        password,
      };
```

2. Now we're making `handleSubmit` to be `async` and it's time to end our object to the API. We do this wrapping in a `try` block a `fetch` function, but this time instead of asking for data, we're sending data by setting the `method` to 'POST', which tells the API we want to create a new thing.We also add headers to let the API know we're sending over JSON data, and finally, we give it our user data in the body, neatly packed into a JSON string with JSON.stringify(user).
3. We check if the API gives us a thumbs up (or rather, an `ok` status). If something goes wrong we will use the `catch` block.

We should end up with something like this:

```jsx
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      const user = {
        name,
        surname,
        email,
        password,
      };

      try {
        const response = await fetch(
          "http://13.73.187.21:8080/travel-journal/user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();

        setData((prevState) => {
          return [...prevState, userData];
        });

        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
      } catch (error) {
        console.log("Failed To create user", error);
      }
    }
  };
```

Notice that we still keep the previous functionality. We create a variable only to update the local state, that's the reason we created:
 ```jsx 
const userData = await response.json();
```

And that's pretty much it, this is some serious skill that needs to be used responsibility.

In the next steps we will cover how to update and delete our data.
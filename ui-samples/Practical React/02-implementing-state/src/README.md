# Step 2 - Implementing useState for Form Inputs

Let's convert our form inputs into controlled components by using React's `useState` hook.

## What are Controlled Components?

A controlled component is an input element whose value is controlled by the state. This means when the input data changes, it updates the state, and the input's displayed value is updated to reflect this new state.


### Importing useState

To use `useState` - we will import it from React:

```jsx
import React, { useState } from 'react';
```

### Adding state to our form fields

We will create a state for each of our form fields using the `useState` hook. Let's initialize all the state variables with an empty string.

```jsx

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    //...
  )
```

### Connecting state to input fields

We need to link each input field to its corresponding state variable. To do this, we should add a `value` attribute to each `input` tag.

```jsx
<input id="name" type="text" placeholder="Write your name" value={name} />
```

We will repeat this for the other fields as well with their own state variable.

### Handling input changes

We do this by adding an `onChange` event to each `input` tag. This will call a function that takes an event object and uses the `set` functionality to update the state with the user input.

```jsx
<input
  id="name"
  type="text"
  placeholder="Write your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

```

We will repeat this for the other fields and that's it! Now our form fields are controlled components. When a user types, the staet for that field updates, which will update the value displayed which is pretty cool. Our App component should look like this:


```jsx
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <main>
        <h1>User Form</h1>
        <form>
          {/* Name  */}
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Write your name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Surname */}
          <div>
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              placeholder="Write your surname"
              id="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Write your password"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Write your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default App;
```

In the next step we will handle the form submission and how to not refresh the page when you submit.
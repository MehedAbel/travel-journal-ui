# Step 4: Adding Form Validation

It's time to make sure our users provide valid data.

## Validation State

First let's add a new piece of state to hold any validation errors.

```jsx
const [errors, setErrors] = useState({});
```

Here we will store or errors.

## Creating a validation function


We need a check for the user's input where we need to add any errors to our state.

For simplicity, we will add some basic checks:

- All fields are required
- The email should have a valid format
- The password length should be at least 8 characters

Here's how our function might look

```jsx
const validate = () => {
  const validationErrors = {};

  // Check if name, surname, email or password are empty
  if (!name) validationErrors.name = "Name is required";
  if (!surname) validationErrors.surname = "Surname is required";
  if (!email) {
    validationErrors.email = "Email is required";
  } else if (!email.include('@')) {
    // Check for a valid email address
    validationErrors.email = "Email address is invalid";
  }
  if (!password) {
    validationErrors.password = "Password is required";
  } else if (password.length < 8) {
    // Check for password length
    validationErrors.password = "Password must be at least 8 characters";
  }

  setErrors(validationErrors);
  return Object.keys(validationErrors).length === 0;
};

```

Now, let's debug our function.

We're creating an empty object and create lots of conditions, if the condition is true, we will add a new property to the object that stores a string message.

At the end we will use our `setErrors` to add our populated object.

Now here is the tricky part, what do we expect from this function, in our case to have an error message stored somewhere (in our `errors` state) and to check if the fields are valid or not, in this case we want to return a boolean value.

How our return works, first we store in an array all the keys from our object, if the `length === 0` we will return true, which means our fields are valid, if not, we will return false because we will populate the array with our object properties (name, surname, email, password).

## Validating on submit

For this example we will make the validation at the end when the user submits the form. We can do this by calling `validate` inside `handleSubmit`, keep in mind we want to do this **after** we use `preventDefaul()`.

```jsx
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      setData((prevState) => {
        return [
          ...prevState,
          {
            name,
            surname,
            email,
            password,
          },
        ];
      });
    }
  };
```

Now if the fields are valid, will store the data.

## Reseting the values after submit

For this we just need to clear all the state values after we submit, so in `handleSubmit` let's set each state to an empty value

```jsx
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      setData((prevState) => {
        return [
          ...prevState,
          {
            name,
            surname,
            email,
            password,
          },
        ];
      });

      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    }
  };
```


## Displaying validation errors

Lastly, we need to display any validation error to the user.

Here's what that might look like for the name input:

```jsx
<div>
  <label htmlFor="name">Name</label>
  <input
    id="name"
    type="text"
    placeholder="Write your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  {errors.name && <p>{errors.name}</p>}
</div>
```

Keep in mind, there are other ways and even libraries for forms, this is just the standard information that you need to use them.

Next step, we will use `useEffect` to make an API request when the component mounts.
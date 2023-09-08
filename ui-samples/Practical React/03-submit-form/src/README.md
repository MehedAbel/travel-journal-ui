# Step 3 - How to submit your form

Right now, our form doesn't do anything when is submitted. That's becausse we haven't implemented what to do so let's start with that.

## Preventing default form behavior

By default, when a form is submitted, the page reloads and any input in the form is sent to a server. We don't want this to happen, so we're going to prevent this default behavior.

We can do this by adding an `onSubmit` event to our `form` tag. It will call a function that takes an event object. Inside this function we call `event.preventDefault()`.


```jsx
function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <main>
        <h1>User Form</h1>
        <form onSubmit={handleSubmit}>
        //...
```

Now let's break this code down. We created a new function and added it on the `onSubmit` event. This is very similar of what we did when we wanted to change the values on the form, this approach of just writing the function without invoking it means that we add it by reference of the function. It will receive the `event` object even if we don't see it sent.

## Store the data in a state


Let's create another state to store our data, we will get them eventually from the server but until then let's see how we can do it.


```jsx
  const [data, setData] = useState([]);
```

First things first, we will start by default with an empty array. We will populate it everytime we submit our form. To do that we will set it in our `handleSubmit` function:


```jsx
  const handleSubmit = (event) => {
    event.preventDefault();
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
  };
```

How this works, we create a callback function, where we pass the previous values from our state, in the return, we will spread the array with the previous values and create a new object with our values.

**In other words, copy what I had before and after add my new data.**

Last part is to show our data:

```jsx
      <div>
        <h2>List of Users</h2>
        {data.map((u, index) => (
          <p key={index}>
            {u.name}, {u.surname}, {u.email}, {u.password}
          </p>
        ))}
      </div>
```

We're mapping through or array and get from each object the properties that hold their values.

In the next step we will add validation.
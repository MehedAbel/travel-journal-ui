# Step 5: Using useEffect to Fetch Data

We are using `useEffect` to fetch data when the component mounts. We're performing this data fetching as a side effect. In React, a side effect is anything that interacts with the world outside of returning React elements from a component - like data fetching, timers.

So keeping this straight forward, `useEffect` allows you to perform side effects in function components.

Basic form is like this after you import it from React:

```jsx
useEffect(() => {
  // Your side effect here.
});
```
In this form, the provided function will run after every render, including the first one.

You can pass a second argument to useEffect - an array of dependencies:

```jsx
useEffect(() => {
  // Your side effect here.
}, [dependency1, dependency2]);

```

In this form, the provided function will only run when the component mounts and when any of the dependencies change. This is useful when your side effect depends on some state or prop.

If you provide an empty array ([]) as the second argument, the function will only run once

Since useEffect cannot be an async function, if you want to run async code in an effect, you should define an async function inside the effect and that's what are we going to do in our case:


```jsx
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://13.73.187.21:8080/travel-journal/users"
        );
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    };
```

Let's understand each step:

1. `const fetchData = async () => { ... }` - Here we're defining an async function named `fetchData`. This function is asynchronous, which means it's designed to perform actions that take some time to complete
2. `try { ... } catch (error) { ... }` - This is a `try/catch` block. It's a way to handle errors in JavaScript. If anything goes wrong inside the `try` block, instead of crashing our program, the code inside the `catch` block will run.
3. `const response = await fetch("http://13.73.187.21:8080/travel-journal/users");` - Here we're using the fetch function to make a request to the server. fetch returns a `Promise` that resolves to the `Response` of the request, whether it is successful or not. The `await` keyword makes JavaScript wait until that `Promise` settles, and then it returns its result.
4. `const userData = await response.json();` -  After we have the response from the server, we use the `.json()` method to parse the response body text as JSON. This also returns a `Promise`, so we use await again to wait for it to finish. After this line, `userData` will contain the data we fetched from the server.
5. `setData(userData);` -  Here we're calling a function `setData` and passing `userData` to it. It will update the state and re-render the component.
6. `console.log("Failed to fetch user data", error)`; - If there's an error while fetching the data (for example, the server is down, or something unexpected blocked it), the `catch` block will run.

Now the remaining part is to add this function in the `useEffect` and call it:
```jsx
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("http://13.73.187.21:8080/travel-journal/users");
    const data = await response.json();
    setUsersData(data);
  };

  fetchData();
}, []);
```
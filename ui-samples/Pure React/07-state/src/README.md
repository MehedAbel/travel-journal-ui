# Introduction to the State of a React Application

Up until now we wrote React without a state, let's break it down step-by-step how we can use it and what is it.

## Setting Up the Trips Data State

First, we create a new state variable `trips` with its setter function `setTrips`. We set up the initial state as an array of objects, each object representing a trip with information about location, period, details, and images.

```jsx
const [trips, setTrips] = useState([
    // our trips
]);
```

This is how we add the `trips` data to our component's state. By storing the data in the component's state, we're making it "reactive": whenever we change the data using `setTrips`, the component will automatically re-render to reflect the new state.

## Showing and Hiding the Cards

Imagine you're building a React app and you want to toggle the visibility of some elements on the screen. You might think of using a variable, but remember, React is all about state and reactivity. This is where the useState hook comes into play.

Firstly, let's import our method from React:

```jsx
import React, { useState } from 'react';
```

Now let's jump into the real deal. `useState` allows us to add state to our function components in React. It's a function, and we pass the initial state to it as an argument:

```jsx
const [isShown, setIsShown] = useState(false);
```

This is destructuring assignment in JavaScript. It's a way to 'unpack' values from arrays or properties from objects into distinct variables.

The `useState` function gives us back an array with two items:

The first item, `isShown`, is the current state. It starts off with the initial state we passed in, which in this case is false.
The second item, `setIsShown`, is a function we can use to update this state.
We're using array destructuring to get these two items out of the array and into their own variables.

Now, what's this `isShown` thing doing? It's our gatekeeper, deciding whether to show our cards or not. If `isShown` is true, our cards show up. If it's false, no cards for us.

Let's introduce a function `toggleShow` to flip the value of `isShown`:

```jsx
const toggleShow = () => {
    setIsShown(!isShown);
};
```

Here, `setIsShown` is setting the state to the opposite of its current value - this is how we toggle!

Finally, in our JSX, we use a ternary operator to decide what to render based on `isShown`:

```jsx
{isShown ? 
(
        <>
            <Card>
              ...
            </Card>
        </>
)
:
(
    <div>No Cards Available</div>
)
}
```

If `isShown` is true, the component inside the first parentheses gets rendered (the cards). If `isShown` is false, we show "No Cards Available".

## Expanding functionality

Now that we've got the hang of showing and hiding our cards, it's time to have some cards to show! We're going to create an array of trip objects and display them on our page.

First off, let's use our seState again to create a new piece of state, 'trips', and its corresponding updater function, 'setTrips':

```jsx
const [trips, setTrips] = useState([
    {
        id: 1,
        location: 'Romania',
        period: { startDate: '15.07.2023', endDate: '25.07.2023' },
        details: { budget: 1500, description: 'Incredible landscapes and lots of history!' },
        images: ['img1.jpg', 'img8.jpg'],
    },
    // ... more trips ...
]);

```

We're setting `trips` to be an array of objects. Each object represents a trip and has an id, location, period, details, and images properties.

Lastly, let's display our 'trips':

```jsx
{trips.map((trip) => (
    <Card key={trip.id}>
        <Location location={trip.location} />
        <Period startDate={trip.period.startDate} endDate={trip.period.endDate} />
        <Details budget={trip.details.budget} description={trip.details.description} />
         <div className="images">
            <p>Images: </p>
            {trip.images.map((image, index) => (
                <button key={index}>{image}</button>
            ))}
         </div>
    </Card>
))}
```

Here, we're using the map function to go through our 'trips' array. For each trip, we're rendering a Card component.


### Delete Functionality

Let's create our 'deleteCard' function:

```jsx
const deleteCard = (id) => {
    setTrips(trips.filter(trip => trip.id !== id));
};
```

This function takes an `id` and removes the trip with that `id` from our `trips` array. It uses the `filter` function, which creates a new array with all the elements that pass a certain test. In this case, we're keeping only the `trips` whose `id` doesn't match the `id` we want to delete. This results in a new array without the trip we want to remove.

In each card, we include a button that calls `deleteCard` with the `trip.id` when clicked. This button allows us to remove the trip card. We also pass each piece of trip data as props to their corresponding components.

```jsx
{trips.map((trip) => (
    <Card key={trip.id}>
        <button onClick={() => deleteCard(trip.id)}>X</button>
        <Location location={trip.location} />
        <Period startDate={trip.period.startDate} endDate={trip.period.endDate} />
        <Details budget={trip.details.budget} description={trip.details.description} />
         <div className="images">
            <p>Images: </p>
            {trip.images.map((image, index) => (
                <button key={index} style={{
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                }}>{image}</button>
            ))}
         </div>
    </Card>
))}
```

That's it! We've added a bunch of cards representing trips and a way to delete them. With this setup, we're starting to see how useState allows us to create more interactive and scenarios in our React Applications.

## Something to keep in mind:

When working with state in React, especially `useState`, there are some critical rules to keep in mind:

Don't Call Hooks Inside **Loops**, **Conditions**, or **Nested Functions**: Hooks should always be used at **the top level of your React functions**. This is to ensure that the hooks are called in the same order every time a component renders, which allows React to correctly preserve the state of Hooks between multiple `useState`.

Always Use Setter Functions to Update State: Remember that you should never try to change a state variable directly. Always use the updating function provided by `useState`. So for our trips state, to add, remove or change a trip, we would use `setTrips` rather than trying to manipulate `trips` directly.

**Understand the Asynchronous Nature of State**: Set state actions are asynchronous. This means if you call the state setter function (like `setTrips` or `setIsShown`), the changes to the state variable may not be immediately available on the next line.
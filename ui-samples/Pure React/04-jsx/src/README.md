# React JSX
This is a step-by-step guide for students to understand the usage of JSX (JavaScript XML) in React.

## What you will learn

- Basic JSX Syntax
- Expressions in JSX
- Ternary Operator
- Inline Styling
- Importing CSS
- Handling Events
- Conditional Rendering
- Storing JSX in Variables
- Lists and Keys

## Basic JSX Syntax

JSX allows us to write HTML syntax in our JavaScript code. This helps us write cleaner code and better understand our application structure.

```jsx

const App = () => {

return (
    <div id="my-id">
        <h1>Hello</h1>
    </div>
)
}
```

## Expressions in JSX

In JSX, curly braces `{}`are like a magic door. Anything you put inside them is read as JavaScript. So, if you want to say hello to a user, you can put their name right into your JSX using `{}`.

```jsx
const name = 'Buddy';
<h1>Hello {name}</h1> // Hello Buddy
```

## Ternary Operator

We can use JavaScript expressions inside JSX, including the ternary `?:` operator for conditional expressions which is a shortcut for an `if` statement. This means you can change what JSX renders based on conditions. Here, we're making the button's text depend on whether the user is registered or not.

```jsx
<button>{isRegistered ? 'Already have an account?' : 'Create an account'}</button>
```

## Inline Styling

In JSX, you can use JavaScript objects for inline styling. Style names are written in camelCase (so no hyphens), and the values are strings.

```jsx
const buttonStyle = {
    backgroundColor: 'purple',
    color: 'white',
    padding: '8px 12px'
}
<button style={buttonStyle}>...</button>
```

## Importing CSS

Sometimes your JavaScript has enough on its plate without worrying about style. In these cases, you can put your styles in a separate CSS file and just import it. It's like ordering in instead of cooking!
Keep in mind we cannot use the keyword `class` since is reserved so we can add classes using the keyword `className`.

```jsx
import './App.css';

...
<h1 className="title">...<h1/>
```


## Handling Events

JSX components can react to events too! Here, we're creating an onClick event that will trigger when the button is clicked. It's like your JSX is saying, "Hey, I noticed you did something!"

```jsx
const handleClick = () => {
    console.log('clicked')
}

<button onClick={handleClick}>...</button>
```


##  Storing JSX in Variables

You can store JSX in variables and then use it elsewhere in your code. This can help you conditionally render parts of your component.

```jsx
const card = (
    <div>
        This is a card
    </div>
)
```

## Conditional Rendering

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

```jsx
{isRegistered ? card : (
    <div> Nothing </div>
)}
```


## Lists and Keys

One of the most common parts of a React application is to have everything reusable. Here we can create multiple HTML tags based of the number of elements in an array.

When you're creating lists in JSX, you need to include a unique key for each item. It's kind of like giving each item a name tag, so React can keep track of who's who!

```jsx
const listOfItems = [         
        {
            id: 1,
            country: 'Bulgaria',
            description: 'It was awesome'
        }, 
        {
            id: 2,
            country: 'Romania',
            description: 'It was legendary'
        },
        {
            id: 3,
            country: 'Moldova',
            description: 'It was amazing'
        }];

{listOfItems.map(item => {
    return (
        <div key={item.id}>
            <h1>{item.country}</h1>
            <p>{item.description}</p>
        </div>
    )
})}
```

This is translated like writing:

```jsx
        <div key={1}>
            <h1>Bulgaria</h1>
            <p>It was awesome</p>
        </div>
        <div key={2}>
            <h1>Romania</h1>
            <p>It was legendary</p>
        </div>
        <div key={3}>
            <h1>Moldova</h1>
            <p>It was amazing</p>
        </div>
```

## Fragments

React components must always return a single root JSX element. This means that you can't return two sibling JSX elements like this:


```jsx
return (
    <div id="my-id">
        <h1>Hello</h1>
    </div>
        <div id="my-id-2">
        <h1>Hello</h1>
    </div>
)
```

However, sometimes you might not want to add an extra node to the DOM, just to satisfy this requirement. This is where Fragments come in!

Fragments let you group a list of children without adding extra nodes to the DOM. You can use `<></>` syntax to declare a fragment. So, the correct code would be:

```jsx
return (
<>
    <div id="my-id">
        <h1>Hello</h1>
    </div>
        <div id="my-id-2">
        <h1>Hello</h1>
    </div>
</>
)
```

Think of Fragments as an invisible wrapper that keeps React happy!

## Comments in JSX

Adding comments in JSX is a bit different than in regular JavaScript. Instead of `//` or `/* */`, you'll need to wrap your comment in `{}` and use `/* */` inside. It might seem a bit odd at first, but it's just another quirk of JSX!

```jsx
 {/* <p>This is a comment</p> */}
```

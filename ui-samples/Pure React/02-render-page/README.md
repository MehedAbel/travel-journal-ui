# A Basic Introduction to React using `React.createElement`

We will create a simple example of a React app built using the `React.createElement` function. It's a fundamental function for creating components.


## 1. Creating the App Component

```js
const App = () => {
    return React.createElement(
        "div",
          {id: "my-id"},
           React.createElement("h1", {}, "Hello Students")
        )
    };
```

In this part of the code, we will create a functional component named App, it can be written with the keyword `function` or as an arrow function, most of the time you'll see the components as arrow functions, is just preference.

This component is just a JavaScript function that returns a React element. That's why `React.createElement` is used for.

`React.createElement` takes three arguments:

1. **Type of the element:** the type of HTML element you want to create. In this case it will be a `div`.
2. **Props:**: Is an object that contains any properties you want to pass to the element, think of them as attributes of your HTML element and in our scenario we're giving the `div` an `id` of `my-id`. We will discuss more about props later.
3. **Children:**: The child elements of this element, or nested elements. This can be a string, a number or another React Element, or an array of any of these. In our case we're creating a `h1` child element that says "Hello Students"

## Connecting our App to the HTML Document

```js
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
```

This part of the code is where we're connecting our `App` component to our HTML document.

First things first, we need to get the reference to the `div` with an `id` of `root` that we have in our HTML file and how we do it is by using `document.getElementById("root")`.

Then we create a root React DOM container with `ReactDOM.createRoot(container)`, think of it as the bridge between or React code and HTML

Finally, we render our `App` component inside the root container with `root.render(React.createElement(App))`

The result being rendered if you inspect in the browser:

```html
<div id="root">
    <div id="my-id">
        <h1>Hello Students</h1>
     </div>   
</div>
```
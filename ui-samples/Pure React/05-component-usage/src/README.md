# React Components
We're exploring how to create and use React components. We've structured our application with a main `App` component that uses several child components. Let's break it down:

## Project Structure

We've organized our components into a `components` folder within the `src` directory. Each component has its own dedicated folder with its JavaScript file and its associated CSS file for styles.

Our project structure looks like this:

```plaintext
src
|-- components
| |--Details
| | |-- Details.js
| | |-- Details.css
| |-- Location
| | |-- Location.js
| | |-- Location.css
| |-- Period
| |-- Period.js
| |-- Period.css
|--
|-- App.js
|-- App.css
```

## The Components

We have three components: `Location`, `Period`, and `Details`. Each of them is defined in a different way to showcase the different methods of defining components in React.

### 1. Location (Function Component)

The `Location` component is a simple function component. This means it's a plain JavaScript function that returns a JSX element. We've exported this component as the default export from its module:

```jsx
import './Location.css';

function Location() {
    return (
        <div className="location">
            <h1>Greece</h1>
        </div>
    )
}

export default Location;
```

### 2. Details (Arrow Function Component)

The Details component is an arrow function component. Arrow functions are a more modern syntax for writing JavaScript functions. This component is exported as a named export:

```jsx
import './Details.css'

export const Details = () => {
    return (
        <div className="details">
            <p>Budget: <span>1500</span></p>
            <p>Description: It was the best experience of my life. I will visit it again.</p>
        </div>
    )
}
```


### 3. Period (Class Component)

Finally, the Period component is a class component. Class components are more complex and have more features than function components, but they also require more boilerplate code:


```jsx
import React, { Component } from "react";
import './Period.css';

class Period extends Component {
    render() {
        return (
            <div className="period">
            <div className="from-period">
                <p>From: </p><span>21.07.2023</span>
            </div>
            <div  className="to-period">
                <p>To:</p> <span>01.08.2023</span>
            </div>
        </div>
        )
    }
}

export default Period;
```

Keep in mind, React moved to functional components and we will write from now on only functional components. Class Components have their our advantages but we will not cover them.

But a brief explanation of what is going on here. We need to import `Component` and extend the class. In order to return JSX we need to use a method called `render()` and return the code.

Regarding this syntax of the import `import React, { Component } from "react";` this is how we can destructure elements and grab what we're interested in, we're grabbing from `react` the `{Component}` wrote in curly braces.
## Using The Components in App.jsx

Inside our main `App` component, we import and use our `Location`, `Period`, and `Details` components. This is achieved by writing the component names as JSX tags (i.e., `<ComponentName/>`). Let's see how it's done:


```jsx
import { Details } from './components/Details/Details';
import Location from './components/Location/Location';
import Period from './components/Period/Period';

const App = () => {
    const images = ['img1.jpg', 'img2.png', 'img3.png']

    return (
        <>
        <div className='card'>
            <Location/>
            <Period/>
            <Details/>
            
            <div className='images'>
                <p>Images: </p>
                {images.map((image, index) => (
                    <button key={index}>{image}</button>
                ))}

            </div>
        </div>
        </>

    )
};

export default App;
```

Notice the different import styles for `Details` compared to `Location` and `Period`. The `Details` component is a named export, hence the import is enclosed in `{}`. The Location and `Period` components are default exports, thus we import them directly.

Inside the `App` component, we have created a 'card' div that includes each of our components. This makes the structure of our application modular, reusable and easier to maintain.

### Map Function and key Prop

Within our `App` component, we're also using JavaScript's `map` function to create an array of buttons for each image in the `images` array:

```jsx
{images.map((image, index) => (
    <button key={index}>{image}</button>
))}
```

In order to avoid the key prop error, we can grab the index of each element from the `map` method, is always the second element, is not necessary to name it `index`.
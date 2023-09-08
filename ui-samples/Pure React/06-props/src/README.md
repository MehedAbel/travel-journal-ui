# Props And Children in React Components
In the previous steps, we've created several React components. Now, let's make our components more flexible and reusable by using **props**.

Props (short for properties) are a way of passing data from parent components to child components. They're passed through component tags just like HTML attributes and can be of any type, including strings, numbers, objects, arrays, functions, and other React components.


## Destructuring Props in Function Components

When we use function components, we can destructure props directly in the function signature. Let's look at the `Location` component for example:

```jsx
function Location({location}) {
    return (
        <div className="location">
            <h1>{location}</h1>
        </div>
    )
}
```

In this function, `{location}` is an object destructuring assignment that allows us to unpack values from the props object passed to the component, directly into distinct variables. This makes our component easier to understand at a glance, because we can see exactly which props it uses.

## Default Props in Function Components

We can also provide default values for props using destructuring. This is done in the `Details` component:

```jsx
export const Details = (props) => {
    const {budget = 'No Budget', description = 'No Description'} = props
    return (
        <div className="details">
            <p>Budget: <span>{budget}</span></p>
            <p>Description: {description}</p>
        </div>
    )
}
```

In this function, we're using default values in our destructuring assignment. If no `budget` or `description` prop is passed to the `Details` component, it will use 'No Budget' and 'No Description' as default values, respectively.

## Using Children in React Components

We also introduce a new component `Card` which uses a special prop children. This prop allows us to pass components as data to other components, creating a "parent-child" relationship between components. Let's look at how this works in the `Card` component:


```jsx
const Card = (props) => {
    return (
        <div className='card'>
            {props.children}
        </div>
    )
}
```

Here, we're using `props.children` to render content that was passed in between the opening and closing tags of `Card`. This makes our `Card` component act like a regular HTML container element (div, section, article, etc), but with its own custom styling or functionality.

Then in our `App` component, we can use the `Card` component to wrap other components:


```jsx
return (
    <Card>
        <Location location='Greece'/>
        <Period from='21.07.2023' to='01.08.2023'/>
        <Details budget={1500} description='It was the best experience of my life. I will visit it again.'/>

        <div className='images'>
            <p>Images: </p>
            {images.map((image, index) => (
                <button key={index}>{image}</button>
            ))}

        </div>
    </Card>
);
```

Here, the `Location`, `Period`, `Details`, and images div are passed as `children` to the `Card` component, and they get rendered wherever we put `{props.children}` in the `Card` component. This concept is a powerful feature in React, and it makes your components more reusable and clean.



## Someting to keep in mind

While working with props and children in React, there are a few things you should keep in mind:

1. **Props are Read-Only**: In React, you should never try to modify props. They should be considered read-only. If you need to modify a value, consider using state inside the component instead.

2. **One-Way Data Flow**: Props in React flow downwards from parent components into child components. This "one-way data flow" makes it easier to understand how data changes throughout your app, without needing to understand complex two-way binding.

3. **Don't Forget Key Prop When Rendering Lists**: When rendering lists in React, you need to provide a key prop for each child in the list. This key helps React identify which items have changed, are added, or are removed and should be a string or number that is unique among siblings.

4. **Children are Opaque**: Children in React are opaque data structures — this means that you don't know what's inside them. It's up to the component using them to decide what to do with them. For example, a `Card` component might choose to render its children with a specific layout, while a `AnotherComponentExample` component might choose to iterate over its children and render them in sequence.

5. **Not All HTML Attributes Are the Same in JSX**: In JSX, some HTML attribute names are written using camelCase — for example, `className` instead of `class`, and `tabIndex` instead of `tabindex`. This is because JSX is more closely aligned with JavaScript than with HTML.
# React Routing Implementation

The primary changes to the Journal App involve the introduction of the react-router-dom library. The `BrowserRouter`, `Routes`, `Route`, `Link`, `useParams` and `useNavigate` are all functionalities provided by this library that we will be integrating into the existing application.

Let's get started with adding routing to your React application using React Router v6.

Firstly, we need to install the React Router Library:

```bash
npm install react-router-dom
```

## Wrap the app inside a Router Component

All the components that make use of the routing should be children of a `Router` component. In this case, we wrap the entire `App` inside the `BrowserRouter`.

```jsx
import {BrowserRouter} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            {/* App content */}
        </BrowserRouter>
    );
}

export default App;

```

## Define the Routes

We will use the `Routes` and `Route` components provided by react-router-dom to define the application's routes. The `element` prop of the Route component is used to specify the component that should be rendered for that route.
Keep in mind the other prop, `path`, this sends the user to a specific URL.

```jsx
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Inside App function
return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<JournalList journals={journals} />}></Route>
            <Route path="/create" element={<CreateJournal saveJournal={saveJournal}/> }></Route>
            <Route path="/edit/:id" element={<EditJournal saveJournal={saveJournal} journals={journals}/> }></Route>
        </Routes>
    </BrowserRouter>
);
```
It's important to know that for each `Route` component that we create needs to be wrapped inside `Routes` which is wrapped inside `BrowserRouter`


## Create Navigation Links

Next, let's add some navigation links using the `Link` component. The to `prop` of the `Link` component is used to specify the target route.

```jsx
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

return (
    <BrowserRouter>
        <nav style={{display: 'flex', gap: '12px', padding:'12px', position: 'absolute', top: 0, left: 0,fontSize: '24px'}}>
            <Link to='/'>Home</Link>
            <Link to='/create'>Create</Link>
        </nav>
        // rest of the code
    </BrowserRouter>
);

```

How does this work, nav will always be rendered even if we change the route.

## Get route paramateres in a component

The `useParams` hook can be used inside a component to get the route parameters. In this case, we use it inside the `EditJournal` component to get the id of the journal to be edited.

```jsx
import {useParams} from "react-router-dom";

// Inside EditJournal function
const { id } = useParams();
```

## Navigate programmatically

We use the `useNavigate` hook to navigate programmatically. In the `JournalList` component, we use this hook to `navigate` to the edit page of a journal when the edit button is clicked.

```jsx
import {useNavigate} from "react-router-dom";

// Inside JournalList function
const navigate = useNavigate();

// Inside the button click handler
navigate(`/edit/${journal.id}`);
```

## Navigate to a different route after submitting the form

In both `CreateJournal` and `EditJournal` components, after the form is submitted, we use the `useNavigate` hook to navigate back to the home page.


```jsx
import {useNavigate} from "react-router-dom";

// Inside CreateJournal and EditJournal functions
const navigate = useNavigate();

// Inside form submit handler
navigate('/');
```

These steps cover the changes needed to introduce react-router-dom v6 into your journal application. It involves changes in how you structure your application, how you define your routes, and how you navigate between them.
Keep in mind that we structured a bit the functionality by refactoring the previous code.

The next step would be to add a global state to our application.
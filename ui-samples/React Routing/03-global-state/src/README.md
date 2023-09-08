# React Context Implementation

Now is time to add our global state.

## Create Context

We first create a new folder in the `src` folder, named `context` here we will add our files.

Let's create a new file there named `JournalContext` it should end with `.jsx` and first things first we will import `createContext` from `react`.

```jsx
import React, {createContext, useState} from 'react';

export const JournalContext = createContext();
```

Now what this does is like our identifier that will be used later.

## Create a Provider

The provider maintains the state that you want and it can also include any kind of logic, from `useEffect` to `useState`, even utility functions.


```jsx
export const JournalProvider = ({children}) => {
    const [journals, setJournals] = useState([
        {
            id: 1,
            name: 'Journal 1',
            budget: 1000,
            date: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
            description: 'A great experience'
        },
        {
            id: 2,
            name: 'Journal 2',
            budget: 1500,
            date: new Date().getDate(),
            description: 'An expensive experience'
        }
    ])

    const saveJournal = (journal) => {
        if (journal.id) {
            setJournals(journals.map((j) => (j.id === journal.id ? journal : j)));
        } else {
            journal.id = Date.now();
            setJournals([...journals, journal]);
        }
    };

    const value = {journals, saveJournal};

    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    );
}
```

We just copied the data from the `App`. but here is the tricky, part, we expect to receive from props `children`. This is because our Provider is a wrapper for the components, just like `BrowserRouter` is.

We store the values that we need to use in our components in `value`, here we create an object and we can add as many functionality as we want.

At the end we return a jsx. The syntax is a bit strange here but what you need to keep in mind is that we just need to return our `JournalContext` with a `.Provider in it and a prop with the `value`, the object that we store our values.


```jsx
    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    );
```

Now about `children` prop, well, this is how we tell React, ok, use it for all the children that you have wrapped.

## Provide Context

Let's choose where we need our context, in our case in all the application so we will wrap everything that we have with our provider, like this:

```jsx
import './App.css'
import JournalList from "./components/JournalList.jsx";
import CreateJournal from "./components/CreateJournal.jsx";
import EditJournal from "./components/EditJournal.jsx";

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import {JournalProvider} from "./context/JournalContext.jsx";

function App() {
    return (
        <JournalProvider>
            <BrowserRouter>
                <nav style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    fontSize: '24px'
                }}>
                    <Link to='/'>Home</Link>
                    <Link to='/create'>Create</Link>
                </nav>
                <Routes>
                    <Route path="/"
                           element={<JournalList/>}></Route>
                    <Route path="/create"
                           element={<CreateJournal/>}></Route>
                    <Route path="/edit/:id"
                           element={<EditJournal/>}></Route>
                </Routes>
            </BrowserRouter>
        </JournalProvider>
    )
}

export default App;

```

## Use Context

In `JournalList`, `CreateJournal`, and `EditJournal` components, you can use the context. This is done by using the `useContext` hook from react and passing `JournalContext` as an argument to it.

Since we have an object in value, we can destructure it and grab our values.

### JournalList Component

```jsx
import {useContext} from 'react';
import JournalContext from './context/JournalContext.jsx';

const JournalList = () => {
    const {journals} = useContext(JournalContext);

    // Rest of the component
}

export default JournalList;
```

### CreateJournal component

```jsx
import {useContext} from 'react';
import JournalContext from './context/JournalContext.jsx';

const CreateJournal = () => {
    const {saveJournal} = useContext(JournalContext);

    // Rest of the component
}

export default CreateJournal;
```

### EditJournal component

```jsx
import {useContext} from 'react';
import JournalContext from './context/JournalContext.jsx';

const EditJournal = () => {
    const {journals, saveJournal} = useContext(JournalContext);

    // Rest of the component
}

export default EditJournal;

```

These are the main steps to incorporate React context into your application. The `JournalContext` will now provide `journals` and `saveJournal` to all components wrapped inside the `JournalProvider`, and these can be accessed using the `useContext` hook.

**!!!Very important to keep in mind, we can have as many providers as we want, we're not limited to only one, let's create another one to toggle the budget.**

## Adding another Provider

```jsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import {JournalContext} from "./JournalContext.jsx";

export const BudgetContext = createContext();

export const BudgetProvider = ({children}) => {
    const {journals} = useContext(JournalContext);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        document.title = journals[0].name + 1
    }, [])

    const value = {isVisible, setIsVisible};
    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
}
```

Now why do we have the journals here, just for the purpose of the example we can use the data from other providers by using the useContext hook.

But how would it work? Well needs to be wrapped by the `JournalProvider`.

```jsx
import './App.css'
import JournalList from "./components/JournalList.jsx";
import CreateJournal from "./components/CreateJournal.jsx";
import EditJournal from "./components/EditJournal.jsx";

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

import {JournalProvider} from "./context/JournalContext.jsx";
import {BudgetProvider} from "./context/BudgetContext.jsx";

function App() {

    return (
        <JournalProvider>
            <BudgetProvider>
                <BrowserRouter>
                    <nav style={{
                        display: 'flex',
                        gap: '12px',
                        padding: '12px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        fontSize: '24px'
                    }}>
                        <Link to='/'>Home</Link>
                        <Link to='/create'>Create</Link>
                    </nav>
                    <Routes>
                        <Route path="/"
                               element={<JournalList/>}></Route>
                        <Route path="/create"
                               element={<CreateJournal/>}></Route>
                        <Route path="/edit/:id"
                               element={<EditJournal/>}></Route>
                    </Routes>
                </BrowserRouter>
            </BudgetProvider>
        </JournalProvider>

    )
}

export default App

```

Let's use it in our component:

```jsx
import {useContext} from "react";
import {BudgetContext} from "../../context/BudgetContext.jsx";

const JournalDetail = ({journal}) => {

    const {isVisible, setIsVisible} = useContext(BudgetContext);

    return (
        <div>
            <h2>Name: {journal.name}</h2>
            {isVisible && <p>Budget: {journal.budget}</p>}
            <p>Date: {journal.date}</p>
            <p>Description: {journal.description}</p>
            <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'Make Budget Not Visible' : 'Make Budget Visible'}</button>
        </div>
    )
}

export default JournalDetail;
```

Now we have a global button that will toggle the budget to be visible or not. 

Next step in our sample is to create a modal.
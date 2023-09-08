# Travel Journal 

This is a React application, using the version 18.2.0. The other library used is react-router-dom, version 6.14.2.

## Overview of the application

This is a walkthrough of the starting point of this project.


### App.jsx

This is the main component that goes rendered.
We're adding here all the routes.

For safety we're checking if the user is authenticated:
```jsx
  const { isAuthenticated } = useContext(AuthContext);
```

By using this value we add conditions in creating routes for the application:

```jsx
function App() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <>
            {isAuthenticated && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route
                    path="/"
                    element={
                        isAuthenticated ? <Home /> : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </>
    );
}
```

The `Navbar` will appear only when the user is authenticated, as for the other routes, when we're sending the element prop, we're adding the condition of sending the user to that specific route or redirect him to the `/login` page.


## Login.jsx

For the login part, we're creating 2 states to store the email and the password. The purpose is to have the values stored by the user when it writes in the inputs.

For the submit part, we will encrypt the password in the sha-256 format. We're using js-sha256: 0.9.1 version of the library, the whole purpose is for security reasons.

The fetching method will be a `POST` and the body will contain the email and hashedPassword, if the promise is successful, the data received will be a boolean, that the user is authenticated or not, this will be stored in our context and navigate the user to the `Home` page.

Keep in mind that currently we don't handle any FE validations for the inputs, this will be required in the future to be added.

## Register.jsx

Similar to what we do in the `Login`, we're adding here 2 additional states for name and surname.
The password is hashed and if we receive the data we're sending the user directly to the `Login` page.

Just as for `Login` this does not contain validations.

## Home.jsx

This is the main page of the application, think of it as landing page.

## Navbar.jsx

This will persist as long as the user is authenticated, if we click logout the global variable which is true will be false and send us to the `Login` page.

# Utilities

The `config.js` is used to add our URL for our API, currently is accessed from a file named `.env`. In order to add it in your root folder create a file named `.env` and add:

```dotenv
VITE_APP_API_URL=YOUR_URL
```

It is important to start with `VITE_APP`.

To access your API, in `config.js` use the following syntax:

```js
const MY_URL = import.meta.env.VITE_APP_NAMED_PICKED;
```


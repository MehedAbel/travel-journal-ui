# Practical React - Form Basics - Step 1

At this initial stage, we will set up a simple form in a React component. Let's breakdown what we will create so far and where are we heading next.

## Creating the Form

We will start adding a `form` HTML tag. All our inputs fields will be added inside this tag.

```jsx
function App() {
  return (
    <main>
      <form>
        // Input fields go here
      </form>
    </main>
  );
}
```

Now, for each piece of data we want to collect, we will create a corresponding field in the form. Each field wil be a `div` containing a `label` and an `input`. Something that you'll probably not be familiar is this new attribute `htmlFor` on each `label`, it connects to the corresponding `input`, by checking the value inside `id` attribute, when you'll click the `label`, your `input` will be focused. It's just for accessibility.

That's how we will create a field:
```jsx
<div>
  <label htmlFor="name">Name</label>
  <input id="name" type="text" placeholder="Write your name" />
</div>
```

And we will repeat the same process for the other fields, **don't forget to change the values**.



Each field has a label and an input element. We will need `Submit` button at the end to submit the form

```jsx
<button type="submit">Submit</button>
```

The reason why the `type` is submit and not `button` is because we want to add our event to the `form`.

To wrap it up - In our `App` component, we have created a basic form with four fields:
- Name
- Surname
- Email
- Password

And at the end a submit button.

Here's what the completed form looks like:

```jsx
function App() {
  return (
    <>
      <main>
        <h1>User Form</h1>
        <form>
          {/* Name  */}
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Write your name" id="name" />
          </div>
          {/* Surname */}
          <div>
            <label htmlFor="surname">Surname</label>
            <input type="text" placeholder="Write your surname" id="surname" />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Write your password" id="email" />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Write your password"
              id="password"
            />
          </div>

          {/* Submit */}
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
}

export default App;
```

The form doesn't do much right now so we will need to make it more interactive in order to do that we will cover the following:

1. Controlled Components - In our case a controlled component is an input element whose value is controlled by the state in our React Component. We will introduce `useState` hook to create a state variable to each form field. Then, we will link each input field to its coresponding state variable.

2. Handling Form Submission - In order to to something with our ofrm we will add a handler function for the forms's `onSubmit` event. This function will prevent the default form submission behavior and instead log the current values of our form fields.

3. Form Validation: We will include some small criterias for the fields to not be blank, email correct format as well for the password.

4. Form Reset: After successful form submission, we will reset the form fields.

5. API Interaction- `POST` requests, `GET` requets to retrieve the users and of course `PUT`, `DELETE` which are key steps to provide a practical experience in a React Application.

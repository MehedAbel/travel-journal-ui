# React Modals

This is our last step on how to create a modal, for this sample we will create one for deleting a journal entry.

## Update the JournalContext

First, we update the `JournalContext` to include a new state `isOpen` that will control the visibility of the modal.


## Create a Modal Component

This is where we will use the `ReactDOM.createPortal` function to append the modal to the body of the DOM. Here's a simple example of a `Modal` sample:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, children, closeModal }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div>
            <div>
                {children}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default Modal;
```

Now let's do a breakdown here, **import ReactDOM from 'react-dom'** is needed because we will need this method to be used.

Our Component takes three props:
- `isOpen` is a boolean which indicates whether the modal should be open or not.
- `children` represents any child elements that are passed into the Modal when it's used. In this case, this will be the "Are you sure you want to delete this?" message and the "No" and "Yes" buttons.
- `closeModal` is a function that will be used to close the modal when the user clicks on the Close button.

**if (!isOpen) return null;** checks if `isOpen` is false. If it is, the function returns null, effectively causing the `Modal` to not be rendered.

`ReactDOM.createPortal( `starts the creation of a Portal. React Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component, which is useful for components like modals that need to break out of their container.

`document.getElementById('modal-root') `is the DOM node that the portal should be rendered to. In this case, we're rendering the modal directly into our div with the id **modal-root**.

So keep in mind when you use `createPortal`, you pass 2 arguments, first is the jsx and the second the element in the DOM.

In `index.html` don't forget to add our new div that **NEEDS** to be above the root one.

```html
  <body>
    <div id="modal-root"></div>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
```


** Update JournalDetail Component

Let's update the `JournalDetail` file to use the `isOpen` and `setIsOpen` states to control the visibility of the modal:

```jsx
import {useContext} from "react";
import {BudgetContext} from "../context/BudgetContext.jsx";
import {JournalContext} from "../context/JournalContext.jsx";
import Modal from "./Modal.jsx";

const JournalDetail = ({journal}) => {

    const { deleteJournal, isOpen, setIsOpen} = useContext(JournalContext);
    const {isVisible, setIsVisible} = useContext(BudgetContext);

    const handleDelete = () => {
        deleteJournal(journal.id);
        setIsOpen(false);
    }

    return (
        <div>
            <h2>Name: {journal.name}</h2>
            {isVisible && <p>Budget: {journal.budget}</p>}
            <p>Date: {journal.date}</p>
            <p>Description: {journal.description}</p>
            <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'Make Budget Not Visible' : 'Make Budget Visible'}</button>
            <button onClick={() => setIsOpen(true)}>Delete Journal</button>
            <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
                <h1>Are you sure you want to delete this? Really, really sure?</h1>
                <div style={{display: 'flex', gap: '8px'}}>
                    <button style={{backgroundColor: 'crimson', color: 'white'}} onClick={() => setIsOpen(false)}>NO</button>
                    <button onClick={handleDelete}>Yes</button>
                </div>

            </Modal>
        </div>
    )
}

export default JournalDetail;

```

The Delete Journal button now opens the modal by setting `isOpen` to true. Within the modal, the No button closes the modal without performing any action by setting `isOpen` to false. The Yes button calls `handleDelete` which deletes the journal and then closes the modal.

To be mentioned the deleteJournal method is added in the context,we just filter the journals based on the id:
```js
    const deleteJournal = (id) => {
        const deletedJournal = journals.filter(j => j.id !== id);
        setJournals(deletedJournal);
    }
```

The styling on the Modal needs a `position:absolute` and after is on your needs how you want it to look.

To wrap it up, this is a simple example to create a modal and now you should have a basic introduction in UI development, now please know, our samples and what you learned is not enough to call yourself a programmer, it is just a starting point in your journey and I wish you all the best if you choose this path.
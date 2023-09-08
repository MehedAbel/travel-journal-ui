# React Routing Journal Start App Documentation

This app allows the users to create, edit and view journal entries.

## Components

Here are the main components in this app:

1. `App`: The main component, it manages the main state and functionality of the app.
2. `JournalList`: This component display the list of all journal entries.
3. `JournalDetail`: This component displays the details of a single journal entry.
4. `CreateJournal`: This component displays a form to create a new journal entry.
5. `EditJournal`: This component displays a form to edit an existing journal entry.


Let's see how the code works:

## App Component

The `App` component is responsible for the overall application state. This includes the list of all journal entries and if the user is currently creating or editing a journal entry.

When the app loads, it starts with two predefined journal entries. It also sets `isCreating` to `true`, which means that the form will be display by default to create.

Methods:
- `saveJournal`: This method is used to save a journal. If the journal already has an id, it's an existing journal and gets updated. If not, it's a new journal and gets added to the array.
- `findJournal`: This method is used to find a journal with a particular id in the journals array.
- `handleEdit`: This method is used to handle the editing of a journal. It sets the currentJournalId to the id of the journal to be edited and changes isCreating to false.

What are we rendering? Either `CreateJournal` or `EditJournal` components based on the value of `isCreating` and the list of the journals

## JournalList Component

The `JournalList` component takes in the list of journals and the `handleEdit` method as props. . It maps over the journals array, rendering a `JournalDetail` component and an 'Edit' button for each journal.

When the 'Edit' button is clicked, the `handleEdit` method is called with the id of the journal to be edited.

## JournalDetail Component

The `JournalDetail` component takes in a journal object as a prop and displays its details. It doesn't manage any state or handle any events.

## CreateJournal Component

The `CreateJournal` component provides a form for creating a new journal entry. It maintains its own local state for the journal being created. When the form is submitted, it calls the `saveJournal` method passed down from the `App` component.

## EditJournal Component

The `EditJournal` component is similar to `CreateJournal`, but it's used for editing existing journal entries.  It receives an existing `journal` as a prop, maintains its own local state for the journal being edited, and when the form is submitted, it calls the `saveJournal` method passed down from the `App` component.

The state of the `journal` being edited is kept in sync with the prop using the `useEffect` hook. It's important to understand that without the useEffect we will not activate a re-render and the UI will not be updated when we select another journal to edit.

## Utilities

We have a `styles` object that we export to add as inline style for the forms.

This covers the basic functionality of this  application, next step is to add routes.



import React, {createContext, useState} from 'react';

export const JournalContext = createContext();

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
            // if the journal already has an id, it's an existing journal. update it
            setJournals(journals.map((j) => (j.id === journal.id ? journal : j)));
        } else {
            // it's a new journal. let's give it an id and add it to the array
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
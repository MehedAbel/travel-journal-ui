import {useState} from 'react'
import './App.css'
import JournalList from "./components/JournalList.jsx";
import CreateJournal from "./components/CreateJournal.jsx";
import EditJournal from "./components/EditJournal.jsx";

function App() {
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
    const [isCreating, setIsCreating] = useState(true);
    const [currentJournalId, setCurrentJournalId] = useState(null);

    const saveJournal = (journal) => {
        if (journal.id) {
            // if the journal already has an id, it's an existing journal. update it
            setJournals(journals.map((j) => (j.id === journal.id ? journal : j)));
        } else {
            // it's a new journal. let's give it an id and add it to the array
            journal.id = Date.now();
            setJournals([...journals, journal]);
        }
        setIsCreating(true); // after saving we update it by default to be true
    };

    const findJournal = (id) => journals.find((journal) => journal.id === id);

    const handleEdit = (id) => {
        setCurrentJournalId(id);
        setIsCreating(false)
    }

    return (
        <div>
            {isCreating ? (
                    <CreateJournal saveJournal={saveJournal}/>
                )
                :
                (
                    <EditJournal journal={findJournal(currentJournalId)}
                                 saveJournal={saveJournal}/>
                )
            }
            <JournalList journals={journals}
                         handleEdit={handleEdit}/>
        </div>
    )
}

export default App

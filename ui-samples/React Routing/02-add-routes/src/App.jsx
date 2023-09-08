import {useState} from 'react'
import './App.css'
import JournalList from "./components/JournalList.jsx";
import CreateJournal from "./components/CreateJournal.jsx";
import EditJournal from "./components/EditJournal.jsx";

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

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

    return (
        <BrowserRouter>
            <nav style={{display: 'flex', gap: '12px', padding:'12px', position: 'absolute', top: 0, left: 0,fontSize: '24px'}}>
                <Link to='/'>Home</Link>
                <Link to='/create'>Create</Link>
            </nav>
          <Routes>
              <Route path="/" element={<JournalList journals={journals} />}></Route>
              <Route path="/create" element={<CreateJournal saveJournal={saveJournal}/> }></Route>
              <Route path="/edit/:id" element={<EditJournal saveJournal={saveJournal} journals={journals}/> }></Route>
          </Routes>
        </BrowserRouter>
    )
}

export default App

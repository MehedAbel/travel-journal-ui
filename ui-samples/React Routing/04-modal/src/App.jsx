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
                    <nav style={{display: 'flex', gap: '12px', padding:'12px', position: 'absolute', top: 0, left: 0,fontSize: '24px'}}>
                        <Link to='/'>Home</Link>
                        <Link to='/create'>Create</Link>
                    </nav>
                  <Routes>
                      <Route path="/" element={<JournalList  />}></Route>
                      <Route path="/create" element={<CreateJournal /> }></Route>
                      <Route path="/edit/:id" element={<EditJournal  /> }></Route>
                  </Routes>
                </BrowserRouter>
            </BudgetProvider>
        </JournalProvider>

    )
}

export default App

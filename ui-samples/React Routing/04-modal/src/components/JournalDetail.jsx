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
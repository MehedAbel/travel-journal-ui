import {useContext} from "react";
import {BudgetContext} from "../context/BudgetContext.jsx";

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
const JournalDetail = ({journal}) => {

    return (
        <div>
            <h2>Name: {journal.name}</h2>
            <p>Budget: {journal.budget}</p>
            <p>Date: {journal.date}</p>
            <p>Description: {journal.description}</p>
        </div>
    )
}

export default JournalDetail
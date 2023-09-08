import JournalDetail from "./JournalDetail.jsx";

const JournalList = ({journals, handleEdit}) => {
    return (
        <div>
            {journals.map((journal) => (
                <div key={journal.id}>
                    <JournalDetail journal={journal}/>
                    <button onClick={() => {
                        handleEdit(journal.id)}
                    }>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default JournalList;
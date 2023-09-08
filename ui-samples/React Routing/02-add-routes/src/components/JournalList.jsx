import JournalDetail from "./JournalDetail.jsx";
import {useNavigate} from "react-router-dom";

const JournalList = ({journals}) => {
    const navigate = useNavigate();
    return (
        <div>
            {journals.map((journal) => (
                <div key={journal.id}>
                    <JournalDetail journal={journal}/>
                    <button onClick={() => {
                        navigate(`/edit/${journal.id}`)
                        }
                    }>Edit</button>
                </div>
            ))}
        </div>
    )
}

export default JournalList;
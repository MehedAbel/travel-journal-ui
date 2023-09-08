import JournalDetail from "./JournalDetail.jsx";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {JournalContext} from "../context/JournalContext.jsx";

const JournalList = () => {
    const { journals} = useContext(JournalContext)
    const navigate = useNavigate();
    if (journals.length === 0) {
        return  (
            <div>
                There's nothing to see for now...
                <em>(sadness)</em>
            </div>
        )
    }
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
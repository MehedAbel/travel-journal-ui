import './index.css'
import deleteIcon from "../../assets/deleteIcon.svg"
import editIcon from "../../assets/editIcon.svg";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Modal/DeleteModal/DeleteModal.jsx";
import {useState} from "react"

const Card = ({card, onEdit}) => {
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);

    const handleDeleteCard = () => {
        console.log("delete card to implement");
        setShowDelete(false);
    }

    function handleGoToDetails() {
        navigate("/travel-journal/"+card.id);
    }

    return (
        <>
            <div className="card shadow bg-white rounded-4 border-1 border-dark">
                <div className="card-body" onClick={handleGoToDetails}>
                    <div className="custom-container">
                        <img src={card.image} className="rounded-4 border-1 border-dark" alt="travel-image"></img>
                    </div>
                    <div className="d-flex flex-column mt-4 mb-2">
                        <p className="fs-3">{card.city}</p>
                        <div className="color-gray">
                            <p>{card.travelDate}</p>
                            <div className="d-flex flex-row">
                                <p>{card.price} {card.currency}</p>
                                <ul>
                                    <li>
                                        <p>{card.noNotes} Notes</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between p-3">
                    <button className="btn button-container" onClick={onEdit}>
                        <img src={editIcon} alt="edit"></img>
                    </button>
                    <button className="btn button-container" onClick={() => setShowDelete(true)}>
                        <img src={deleteIcon} alt="delete"></img>
                    </button>
                </div>
            </div>
            {showDelete && <DeleteModal onDelete={handleDeleteCard} onClose={() => setShowDelete(false)}/>}
        </>
    );
};

export default Card;

import './index.css'
import deleteIcon from "../../assets/deleteIcon.svg"
import editIcon from "../../assets/editIcon.svg";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../Modal/DeleteModal/DeleteModal.jsx";
import React, {useEffect, useState} from "react";

const Card = ({card, onEdit, onDelete}) => {
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);


    const handleDeleteCard = () => {
        const error = onDelete();
        if (error) {
            // TODO: Implement error into base modal in sprint 4!
            alert(error);
        } else {
            setShowDelete(false);
        }
    }

    useEffect(() => {
        if (card.image) {
            decodeImage(card.image);
        } else {
            console.log('Card image is empty or undefined.');
        }
    }, [card.image]);

    const decodeImage = (imageData) => {
        try {
            const byteData = new Uint8Array(atob(imageData).split('').map(char => char.charCodeAt(0)));
            const decodedImage = `data:image/jpg;base64,${btoa(String.fromCharCode.apply(null, byteData))}`;
            setImageSrc(decodedImage);
        } catch (error) {
            console.error('Error decoding image:', error);
        }
    };

        function handleGoToDetails() {
            //todo implement using useNavigate travel-journal/travel/{travelJournalId}
            console.log(`to implement go to travel card details`);
        }

    return (
        <>
            <div className="card shadow bg-white rounded-4 border-1 border-dark">
                <div className="card-body" onClick={handleGoToDetails}>
                    <div className="custom-container">
                        {imageSrc && <img src={imageSrc} className="rounded-4 border-1 border-dark" alt="travel-image" />}
                    </div>
                    <div className="d-flex flex-column mt-4 mb-2">
                        <p className="fs-3">{card.city}</p>
                        <div className="color-gray">
                            <p>{card.startDate} to {card.endDate}</p>
                            <div className="d-flex flex-row">
                                <p>{card.price} {card.currency}</p>
                                <div className="date-separator">•</div>
                                <p>{card.noNotes} Notes</p>
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

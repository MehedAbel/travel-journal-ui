import styles from './Card.module.css';
import deleteIcon from '../../assets/deleteIcon.svg';
import editIcon from '../../assets/editIcon.svg';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../Modal/DeleteModal/DeleteModal.jsx';
import React, { useState } from 'react';
import ImageComponent from '../Image/ImageComponent';
import { formatDate } from '../Date/Date.jsx';

// eslint-disable-next-line react/prop-types
const Card = ({ card, onEdit, onDelete }) => {
    const navigate = useNavigate();
    const [showDelete, setShowDelete] = useState(false);

    const handleDeleteCard = () => {
        onDelete().then((error) => {
            if (error) {
                // TODO: Implement error into base modal in sprint 4!
                alert(error);
            } else {
                setShowDelete(false);
            }
        });
    };

    function handleGoToDetails() {
        const location = card.location.split(',')[0];
        navigate(`/${location}`, { state: { travelId: card.id } });
    }

    return (
        <>
            <div className="card shadow bg-white rounded-4 border-1 border-dark">
                <div className="card-body" onClick={handleGoToDetails}>
                    <div className={styles['custom-container']}>
                        {card.imageId && <ImageComponent imageId={card.imageId} />}
                    </div>
                    <div className="d-flex flex-column mt-4 mb-2">
                        <p className="fs-3">{card.location}</p>
                        <div className={styles['color-gray']}>
                            <p>
                                {formatDate(card.startDate)} to {formatDate(card.endDate)}
                            </p>
                            <div className="d-flex flex-row">
                                <p>
                                    {card.price} {card.currency}
                                </p>
                                <div className={styles['date-separator']}>•</div>
                                <p>{card.noNotes} Notes</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between p-3">
                    <button className={`btn ${styles['button-container']}`} onClick={onEdit}>
                        <img src={editIcon} alt="edit"></img>
                    </button>
                    <button
                        className={`btn ${styles['button-container']}`}
                        onClick={() => setShowDelete(true)}
                    >
                        <img src={deleteIcon} alt="delete"></img>
                    </button>
                </div>
            </div>
            {showDelete && (
                <DeleteModal onDelete={handleDeleteCard} onClose={() => setShowDelete(false)} />
            )}
        </>
    );
};

export default Card;

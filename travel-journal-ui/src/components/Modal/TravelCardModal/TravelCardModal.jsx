import React, { useState } from 'react';
import styles from './index.module.css';
import uploadIcon from '../../../assets/uploadIcon.svg';
import Modal from '../BaseModal/Modal.jsx';

// eslint-disable-next-line react/prop-types
const TravelCardModal = ({ onClose, card, header, subheader }) => {
    const [isValid, setIsValid] = useState(card !== undefined);

    return (
        <Modal
            onClose={onClose}
            header={header}
            subheader={subheader}
            actionButtonText={'Save'}
            disabled={!isValid}>
            <div className={styles['upload-photo-group']}>
                <label>Cover Photo</label>
                <div className={styles['upload-group']}>
                    <img src={uploadIcon} alt="uploadIcon"></img>
                    <p className={styles['upload-paragraph']}>Upload</p>
                </div>
            </div>
            <div>
                <label>Destination Name</label>
                <input
                    className={styles['destination']}
                    type="text"
                    placeholder="New Destination"
                    name="destination"
                />
            </div>
            <div className={styles['date-group']}>
                <div className={styles['start-date-group']}>
                    <label>Start Date</label>
                    <input className={styles['sd-input']} type="date" name="startDate" />
                </div>
                <div className={styles['end-date-group']}>
                    <label>End Date</label>
                    <input className={styles['ed-input']} type="date" name="endDate" />
                </div>
            </div>
            <div>
                <label>Budget</label>
                <input
                    className={styles['budget']}
                    type="text"
                    placeholder="New Budget"
                    name="budget"
                />
            </div>
            <div>
                <label>Description & Itinerary</label>
                <input
                    className={styles['description']}
                    type="text"
                    placeholder="New Description"
                    name="description"
                />
            </div>
        </Modal>
    );
};

export default TravelCardModal;

import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import uploadIcon from '../../../assets/uploadIcon.svg';
import Modal from '../BaseModal/Modal.jsx';
import ImageComponent from '../../Image/ImageComponent.jsx';
import { formatDate } from '../../Date/Date.jsx';
import removeIcon from '../../../assets/x-icon.svg';
import { API_URL } from '../../../config.js';

// eslint-disable-next-line react/prop-types
const TravelCardModal = ({ onClose, card, header, subheader, image, reloadCardList }) => {
    const [newImage, setNewImage] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        location: card ? card.location : '',
        startDate: card ? card.startDate : ['', '', ''],
        endDate: card ? card.endDate : ['', '', ''],
        budget: card ? card.price : '',
        description: card ? card.description : '',
        imageId: card ? card.imageId : null
    });

    useEffect(() => {
        setFormData((prev) => ({ ...prev, image: imageData }));
    }, [imageData]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('tokenType');

        const traveljournal = new Blob(
            [
                JSON.stringify({
                    userId: 15,
                    location: formData.location,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    budget: formData.budget,
                    description: formData.description
                })
            ],
            { type: 'application/json' }
        );

        const payloadFormData = new FormData();
        payloadFormData.append('travelJournalDTO', traveljournal);
        payloadFormData.append('file', formData.image);

        try {
            let response;
            if (card) {
                response = await fetch(`${API_URL}/travel-journal/travel/${card.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `${tokenType} ${token}`
                    },
                    body: payloadFormData
                });
            } else {
                response = await fetch(`${API_URL}/travel-journal/travel`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${tokenType} ${token}`
                    },
                    body: payloadFormData
                });
            }

            if (response.ok) {
                reloadCardList();
                onClose();
            } else {
                const errors = await response.json();
                console.error('Failed to save data:', response.statusText);
                setError(errors.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate' || name === 'endDate') {
            const dateArray = value.split('-').map(Number);
            setFormData({ ...formData, [name]: dateArray });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, image: file }));
            setNewImage(reader.result);
            setImageName(file.name);
        };
    };

    const handleRemoveImage = () => {
        setFormData({ ...formData, imageId: null });
        setNewImage(null);
        setImageName(null);
    };

    return (
        <Modal
            onClose={onClose}
            header={header}
            subheader={subheader}
            actionButtonText={'Save'}
            onAction={handleSave}
        >
            <label>Cover Photo</label>
            {formData.imageId || newImage ? (
                <div className={styles['uploaded-image-container']}>
                    <div className={styles['uploaded-image']}>
                        {newImage ? (
                            <img src={newImage} alt="new-image-uploaded" />
                        ) : (
                            <ImageComponent
                                imageId={formData.imageId}
                                updateImageName={setImageName}
                                updateImageData={setImageData}
                            />
                        )}
                    </div>
                    <div className={styles['image-name']}>
                        <p>{imageName}</p>
                        <button className={styles['remove-button']} onClick={handleRemoveImage}>
                            <img src={removeIcon} alt="remove"></img>
                        </button>
                    </div>
                </div>
            ) : (
                <div className={styles['upload-photo-group']}>
                    <label htmlFor="fileInput">
                        <div className={styles['upload-group']}>
                            <img src={uploadIcon} alt="uploadIcon"></img>
                            <p className={styles['upload-paragraph']}>Upload</p>
                            <input type="file" id="fileInput" onChange={handleUploadImage} />
                        </div>
                    </label>
                </div>
            )}

            <div>
                <label>Destination Name</label>
                <input
                    className={styles['location']}
                    type="text"
                    placeholder="New Destination"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles['date-group']}>
                <div className={styles['start-date-group']}>
                    <label>Start Date</label>
                    <input
                        className={styles['sd-input']}
                        type="date"
                        name="startDate"
                        value={formatDate(formData.startDate)}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles['end-date-group']}>
                    <label>End Date</label>
                    <input
                        className={styles['ed-input']}
                        type="date"
                        name="endDate"
                        value={formatDate(formData.endDate)}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div>
                <label>Budget</label>
                <input
                    className={styles['budget']}
                    type="number"
                    placeholder="New Budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Description & Itinerary</label>
                <input
                    className={styles['description']}
                    type="text"
                    placeholder="New Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <div className={styles['error']}>{error}</div>}
        </Modal>
    );
};

export default TravelCardModal;

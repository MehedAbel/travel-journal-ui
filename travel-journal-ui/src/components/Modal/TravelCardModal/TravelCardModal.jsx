import React, { useState } from 'react';
import styles from './index.module.css';
import uploadIcon from '../../../assets/uploadIcon.svg';
import Modal from '../BaseModal/Modal.jsx';
import ImageComponent from '../../Image/ImageComponent.jsx';

const TravelCardModal = ({ onClose, card, header, subheader, image }) => {
    const [isValid, setIsValid] = useState(card !== undefined);
    const [imageName, setImageName] = useState(null);
    const [newImage, setNewImage] = useState(null);

    const [formData, setFormData] = useState({
        location: card ? card.location : '',
        startDate: card ? card.startDate : '',
        endDate: card ? card.endDate : '',
        budget: card ? card.price : '',
        description: card ? card.description : '',
        image: card ? card.image : null, // ??
        imageId: card ? card.imageId : null // ??
    });
    console.log('clickpecard: ->', formData);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('tokenType');

        const dataToSend = {
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.endDate,
            budget: formData.budget,
            description: formData.description,
            image: formData.image,
            imageId: formData.imageId
        };

        try {
            let response;
            if (card) {
                response = await fetch(`${API_URL}/travel-journal/travel/${card.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `${tokenType} ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });
            } else {
                response = await fetch(`${API_URL}/travel-journal/travel`, {
                    method: 'POST',
                    headers: {
                        Authorization: `${tokenType} ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                });
            }

            if (response.ok) {
                onClose();
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log(
        'startdate: ',
        formData.startDate[0] + '-' + formData.startDate[1] + '-' + formData.startDate[2]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
            setNewImage(URL.createObjectURL(reader.result));
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
            disabled={!isValid}>
            <label>Cover Photo</label>
            {formData.imageId || newImage ? (
                <div className={styles['uploaded-image-container']}>
                    <div className={styles['uploaded-image']}>
                        {newImage ? (
                            <img src={newImage} alt="new-image-uploaded" />
                        ) : (
                            <ImageComponent imageId={formData.imageId} />
                        )}
                    </div>
                    <div className={styles['image-name']}>
                        <p>{newImage ? imageName : card ? card.imageName : ''}</p>
                        <button className={styles['remove-button']} onClick={handleRemoveImage}>
                            X
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
                />
            </div>
            <div className={styles['date-group']}>
                <div className={styles['start-date-group']}>
                    <label>Start Date</label>
                    <input
                        className={styles['sd-input']}
                        type="date"
                        name="startDate"
                        value={
                            formData.startDate[0] +
                            '-0' +
                            formData.startDate[1] +
                            '-' +
                            formData.startDate[2]
                            /*formData.startDate*/
                        }
                        onChange={handleChange}
                    />
                </div>
                <div className={styles['end-date-group']}>
                    <label>End Date</label>
                    <input
                        className={styles['ed-input']}
                        type="date"
                        name="endDate"
                        value={
                            formData.endDate[0] +
                            '-0' +
                            formData.endDate[1] +
                            '-' +
                            formData.endDate[2]
                            /*formData.endDate*/
                        }
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div>
                <label>Budget</label>
                <input
                    className={styles['budget']}
                    type="text"
                    placeholder="New Budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
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
                />
            </div>
        </Modal>
    );
};

export default TravelCardModal;

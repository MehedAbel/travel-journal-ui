import React, { useEffect, useState } from 'react';
import Modal from '../../Modal/BaseModal/Modal.jsx';
import Carousel from './Carousel/Carousel.jsx';
import styles from './ViewNote.module.css';
import { API_URL } from '../../../config.js';

const ViewNote = ({ note = {}, onClose }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImage = async (imageId) => {
            const token = localStorage.getItem('token');
            const tokenType = localStorage.getItem('tokenType');
            try {
                const response = await fetch(`${API_URL}/travel-journal/image/${imageId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `${tokenType} ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImages((prevImages) => [...prevImages, reader.result]);
                    };
                    reader.readAsDataURL(blob);
                } else {
                    console.error('Failed to load image:', response.statusText);
                }
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        if (note.imagesIds) {
            note.imagesIds.forEach((imageId) => {
                loadImage(imageId);
            });
        }
    }, []);

    return (
        <Modal
            header="View Note"
            subheader="View your note details below."
            onClose={onClose}
            disabled={false}>
            <div className={styles['body']}>
                {images && images.length >= 1 ? (
                    <Carousel images={images} />
                ) : (
                    <div className={styles['no-images']}>No images to display</div>
                )}
                <div className={styles['note']}>
                    <div className={styles['name']}>
                        <label>Name</label>
                        <input
                            type="text"
                            disabled={true}
                            value={note.name ? note.name : 'No name'}
                        />
                    </div>
                    <div className={styles['date']}>
                        <label>Date</label>
                        <input
                            type="text"
                            disabled={true}
                            value={note.date ? note.date : 'No date'}
                        />
                    </div>
                    <div className={styles['description']}>
                        <label>Description & Itinerary</label>
                        <textarea
                            disabled={true}
                            value={note.description ? note.description : 'No description'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ViewNote;

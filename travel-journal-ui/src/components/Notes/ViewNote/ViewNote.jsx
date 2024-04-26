import React, { useEffect, useState } from 'react';
import Modal from '../../Modal/BaseModal/Modal.jsx';
import Carousel from './Carousel/Carousel.jsx';
import styles from './ViewNote.module.css';
import { API_URL } from '../../../config.js';

const ViewNote = ({ note = {}, onClose }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('tokenType');

        const loadImage = async (imageId) => {
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

        if (note.fileIds) {
            setImages([]);
            note.fileIds.forEach((imageId) => {
                loadImage(imageId);
            });
        }
    }, [note]);

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
                            value={note.destinationName ? note.destinationName : 'No destination'}
                        />
                    </div>
                    <div className={styles['date']}>
                        <label>Date</label>
                        <input
                            type="text"
                            disabled={true}
                            value={
                                note.date
                                    ? `${note.date[2]} / ${note.date[1]} / ${note.date[0]}`
                                    : 'No date'
                            }
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

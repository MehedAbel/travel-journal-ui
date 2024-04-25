import React from 'react';
import Modal from '../../Modal/BaseModal/Modal.jsx';
import Carousel from './Carousel/Carousel.jsx';
import styles from './ViewNote.module.css';

const ViewNote = ({ note = {}, onClose }) => {
    return (
        <Modal
            header="View Note"
            subheader="View your note details below."
            onClose={onClose}
            disabled={false}>
            <div className={styles['body']}>
                {note.images && note.images.length >= 1 ? (
                    <Carousel images={note.images} />
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

import React from 'react';
import styles from './index.module.css';
import Modal from "../BaseModal/Modal.jsx";

const DeleteModal = ({ onClose, onDelete}) => {
    return (
        <Modal
            onClose={onClose}
            header={'Delete Travel'}
            actionButtonText={'Delete'}
            disabled={false}
            onAction={onDelete}
            dialogClassName="custom-delete-dialog"
        >
            <p className={styles['delete-paragraph']}>Are you sure you want to delete the travel?</p>
        </Modal>
    );
};
export default DeleteModal;
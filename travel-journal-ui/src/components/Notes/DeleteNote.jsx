import React from 'react';
import './deleteNote.css';
import Modal from '../Modal/BaseModal/Modal';
import styles from "../Modal/DeleteModal/index.module.css";

const DeleteNote = ({ noteName, onDelete, onCancel }) => {

    return (
        <Modal
            onClose={onCancel}
            header={'Delete Note'}
            actionButtonText={'Delete'}
            disabled={false}
            onAction={onDelete}
            dialogClassName={`custom-delete-dialog`}
        >
            <p className={styles['delete-paragraph']}>
                Are you sure you want to delete the "{noteName}" note?
            </p>
        </Modal>
    );
};

export default DeleteNote;
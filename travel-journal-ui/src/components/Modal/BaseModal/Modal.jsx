import React from 'react';
import { Button, Modal as BootstrapModal } from 'react-bootstrap';
import styles from './index.module.css';

const Modal = ({ onClose, header, subheader, onAction, actionButtonText, disabled, children }) => {
    return (
        <BootstrapModal show={true} onHide={onClose} dialogClassName={styles['custom-dialog']}>
            <BootstrapModal.Header className={styles['modal-header']}>
                <h2>{header}</h2>
                <p>{subheader}</p>
            </BootstrapModal.Header>
            <BootstrapModal.Body className={styles['modal-body']}>
                {children}
            </BootstrapModal.Body>
            <BootstrapModal.Footer className={styles['modal-footer']}>
                <Button className={styles['cancel-btn']} onClick={onClose}>Cancel</Button>
                {actionButtonText && <Button className={styles['action-btn']} disabled={disabled} onClick={onAction}>{actionButtonText}</Button>}
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;
import React from 'react';
import styles from './NewTravel.module.css';

const NewTravel = ({ onClick }) => {
    return (
        <button className={styles['new-travel-button']} onClick={onClick}>
            +
        </button>
    );
};

export default NewTravel;

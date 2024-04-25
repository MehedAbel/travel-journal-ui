import React, { useState, useEffect } from 'react';
import Card from '../Card/Card.jsx';
import { API_URL } from '../../config.js';
import '../CardList/index.css';
import styles from './CardList.module.css'

const CardList = ({ entities, setEntities, onEdit }) => {
    // Returns a Promise which, if unsuccessful, provides an error string do display,
    // or if successful, an empty string.
    const deleteCard = (cardId) => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('tokenType');

        var error = '';

        return fetch(`${API_URL}/travel-journal/travel/${cardId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${tokenType} ${token}`,
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .then((res) => {
                if (!res.ok) throw res;

                // Refresh the displayed cards by removing it locally from entities.
                setEntities((prev) => prev.filter((item) => item.id !== cardId));

                return '';
            })
            .catch((error) => {
                //console.error("Error: ", error);
                return 'Could not delete card!';
            });
    };

    const renderCards = entities.map((item) => {
        return (
            <div key={item.id} className={`col ${styles['custom-col']}`}>
                <Card
                    card={item}
                    onEdit={() => onEdit(item)}
                    onDelete={() => deleteCard(item.id)}
                />
            </div>
        );
    });

    return (
        <div>
            {entities.length > 0 ? (
                <div className="d-flex flex-wrap flex-row p-2 gap-4">{renderCards}</div>
            ) : (
                <p>You don't have any travels yet</p>
            )}
        </div>
    );
};

export default CardList;

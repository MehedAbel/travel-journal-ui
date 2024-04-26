import React, { useEffect, useState } from 'react';
import styles from './TravelDetails.module.css';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs.jsx';
import { API_URL } from '../../config.js';
import NoteDataGrid from '../Notes/NoteDataGrid.jsx';
import ImageComponent from '../Image/ImageComponent.jsx';
import { formatDate } from '../Date/Date.jsx';

const TravelDetails = () => {
    const [travelDetails, setTravelDetails] = useState([]);
    const location = useLocation();
    const travelId = location.state.travelId;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('tokenType');

        fetch(`${API_URL}/travel-journal/travel/${travelId}`, {
            method: 'GET',
            headers: {
                Authorization: `${tokenType} ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setTravelDetails({
                        id: data.travelId,
                        imageId: data.coverPhotoId,
                        location: data.location,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        description: data.description,
                        notesList: data.notesList,
                        noNotes: data.notesList ? data.notesList.length : 0
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [travelId]);

    return (
        <div className="travel-container">
            <Breadcrumbs />
            <div className={styles['travel-details']}>
                <div className="header">
                    <div className={styles['city']}>{travelDetails.location}</div>
                    <div className={styles['details']}>
                        <div className="dates">
                            {formatDate(travelDetails.startDate)} to{' '}
                            {formatDate(travelDetails.endDate)}
                        </div>
                        <div className={styles['date-separator']}>•</div>
                        <div className={styles['notes']}>{travelDetails.noNotes} Notes</div>
                    </div>
                </div>
                <div>
                    {travelDetails.imageId && <ImageComponent imageId={travelDetails.imageId} />}
                </div>
                <div className={styles['description']}>
                    <p>{travelDetails.description}</p>
                </div>
                <div className={styles['notes-container']}>
                    <div className={styles['button-wrapper']}>
                        <button className={styles['new-note-button']}> + New Note</button>
                    </div>
                    <div className={styles['notes-table']}>
                        <NoteDataGrid notesList={travelDetails.notesList}></NoteDataGrid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TravelDetails;

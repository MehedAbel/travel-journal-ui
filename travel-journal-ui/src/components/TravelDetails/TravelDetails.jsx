import React, {useEffect, useState} from 'react';
import './index.css';
import {decodeImage} from "../Card/Card.jsx";
import {useLocation} from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
import {API_URL} from "../../config.js";

const TravelDetails = () => {
    const [travelDetails, setTravelDetails] = useState([]);
    const location = useLocation();
    const travelId = location.state.travelId;

    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenType = localStorage.getItem("tokenType");

        fetch(`${API_URL}/travel-journal/travel/${travelId}`, {
            method: "GET",
            headers: {
                Authorization: `${tokenType} ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setTravelDetails({
                        id: data.travelId,
                        image: decodeImage(data.coverPhoto.fileContent),
                        city: data.location,
                        startDate: data.startDate,
                        endDate: data.endDate,
                        description: data.description,
                        noNotes: data.notesList ? data.notesList.length : 0,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [travelId]);

    return (
        <div className="travel-container">
            <Breadcrumbs/>
            <div className="travel-details">
                <div className="header">
                    <div className="city">{travelDetails.city}</div>
                    <div className="details">
                        <div className="dates">{travelDetails.startDate} to {travelDetails.endDate}</div>
                        <div className="date-separator">•</div>
                        <div className="notes">{travelDetails.noNotes} Notes</div>
                    </div>
                </div>
                <div>
                    <img src={travelDetails.image} alt="placeholder"/>
                </div>
                <div className="description">
                    <p>{travelDetails.description}</p>
                </div>
                <div className="notes-container">
                    <div className="button-wrapper">
                        <button className="new-note-button"> + New Note</button>
                    </div>
                    <div className="notes-table">
                        <div>No notes available yet.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TravelDetails;

import React from 'react';
import './index.css';

// eslint-disable-next-line react/prop-types
const NewTravel = ({ onClick }) => {
    return (
        <button className="new-travel-button" onClick={onClick}>
            +
        </button>
    );
};

export default NewTravel;

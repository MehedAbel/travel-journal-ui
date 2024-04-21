import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config.js';

function ImageComponent({ imageId }) {
    const [imageData, setImageData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadImage = async () => {
            const token = localStorage.getItem('token');
            const tokenType = localStorage.getItem('tokenType');
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
                        setImageData(reader.result);
                    };
                    reader.readAsDataURL(blob);
                } else {
                    console.error('Failed to load image:', response.statusText);
                }
            } catch (error) {
                setError('Failed to load image:');
                console.error('Error loading image:', error);
            }
        };
        loadImage();
    }, [imageId]);

    return (
        <>
            {error ? <div>Error: {error}</div> : null}
            {imageData ? <img src={imageData} alt={`Image ${imageId}`} /> : <div>Loading...</div>}
        </>
    );
}

export default ImageComponent;

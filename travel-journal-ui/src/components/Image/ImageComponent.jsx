import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config.js';

function ImageComponent({ imageId, updateImageName, updateImageData }) {
    const [error, setError] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState(null);

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
                    },
                    mode: 'cors'
                });
                if (response.ok) {
                    const contentDisposition = response.headers.get('content-disposition');
                    if (contentDisposition !== null) {
                        const filename = contentDisposition.split('filename=')[1];
                        const cleanFilename = filename.replace(/"/g, '');
                        setImageName(cleanFilename);
                        if (updateImageName) {
                            updateImageName(cleanFilename);
                        }
                    }
                    const blob = await response.blob();
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImageData(reader.result);
                    };
                    reader.readAsDataURL(blob);
                    if (updateImageData) {
                        updateImageData(blob);
                    }
                } else {
                    console.error('Failed to load image:', response.statusText);
                }
            } catch (error) {
                setError('Failed to load image:');
                console.error('Error loading image:', error);
            }
        };
        loadImage();
    }, [imageId, updateImageName]);

    return (
        <>
            {error ? <div>Error: {error}</div> : null}
            {imageData ? <img src={imageData} alt={'imageName'} /> : <div>Loading...</div>}
        </>
    );
}

export default ImageComponent;

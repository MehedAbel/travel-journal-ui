import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import './Carousel.css'; // don't use css modules here, this modifies the styles of the react-image-gallery library
import ArrowLeft from '../../../../assets/arrow-left.svg';
import ArrowRight from '../../../../assets/arrow-right.svg';

const Carousel = ({ images }) => {
    const imageUrls = images.map((imageUrl, index) => ({
        original: imageUrl,
        thumbnail: imageUrl,
        originalAlt: `Image ${index + 1}`,
        thumbnailAlt: `Image ${index + 1}`
    }));

    const renderLeftNav = (onClick, disabled) => {
        return (
            <button
                type="button"
                className="image-gallery-custom-left-nav"
                disabled={disabled}
                onClick={onClick}
            >
                <img src={ArrowLeft} alt="Left Arrow" />
            </button>
        );
    };

    const renderRightNav = (onClick, disabled) => {
        return (
            <button
                type="button"
                className="image-gallery-custom-right-nav"
                disabled={disabled}
                onClick={onClick}
            >
                <img src={ArrowRight} alt="Right Arrow" />
            </button>
        );
    };

    return (
        <ImageGallery
            items={imageUrls}
            renderLeftNav={renderLeftNav}
            renderRightNav={renderRightNav}
            showFullscreenButton={false}
            showPlayButton={false}
            disableSwipe={false}
            showThumbnails={imageUrls.length > 1 ? true : false}
        />
    );
};

export default Carousel;

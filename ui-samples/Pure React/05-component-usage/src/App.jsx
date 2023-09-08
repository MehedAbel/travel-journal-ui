import React from 'react'
import { createRoot } from "react-dom/client";

import './App.css';
import Period from './components/Period/Period';
import Location from './components/Location/Location';
import { Details } from './components/Details/Details';

const App = () => {

    const images = ['img1.jpg', 'img2.png', 'img3.png']

    return (
        <>
            <div className='card'>
                <Location/>
                <Period/>
                <Details/>

                <div className='images'>
                    <p>Images: </p>
                    {images.map((image, index) => (
                        <button key={index}>{image}</button>
                    ))}

                </div>
            </div>
        </>

    )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
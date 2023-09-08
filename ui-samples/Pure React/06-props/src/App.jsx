import React from 'react'
import { createRoot } from "react-dom/client";

import './App.css';
import Period from './components/Period/Period';
import Location from './components/Location/Location';
import { Details } from './components/Details/Details';

const Card = (props) => {
    return (
        <div className='card'>
            {props.children}
        </div>
    )
}

const App = () => {

    const images = ['img1.jpg', 'img2.png', 'img3.png']

    return (
        <Card>
            <Location location='Greece'/>
            <Period startDate='21.07.2023' endDate='01.08.2023'/>
            <Details budget={1500} description='It was legendary'/>

            <div className='images'>
                <p>Images: </p>
                {images.map((image, index) => (
                    <button key={index}>{image}</button>
                ))}

            </div>
        </Card>

    )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
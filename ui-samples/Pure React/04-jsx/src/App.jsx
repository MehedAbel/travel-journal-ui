import React from 'react'
import {createRoot} from "react-dom/client";

import './App.css';

const App = () => {
    const name = 'Buddy';
    const isRegistered = false;
    const buttonStyle = {
        backgroundColor: 'purple',
        color: 'white',
        padding: '8px 12px'
    }

    const handleClick = () => {
        console.log('clicked')
    }
    const card = (
        <div>
            This is a card
        </div>
    )

    const listOfItems = [
        {
            id: 1,
            country: 'Bulgaria',
            description: 'It was awesome'
        },
        {
            id: 2,
            country: 'Romania',
            description: 'It was legendary'
        },
        {
            id: 3,
            country: 'Moldova',
            description: 'It was amazing'
        }
    ]
    return (
        <>
            <div id="my-id">
                <h1 className='title'>Hello {name}</h1>
                <button onClick={handleClick}
                        style={buttonStyle}>{isRegistered ? 'Already have an account?' : 'Create an account'}</button>
                {isRegistered ? card : (
                    <div> Nothing </div>
                )}

                {listOfItems.map(item => {
                    return (
                        <div key={item.id}>
                            <h1>{item.country}</h1>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
            </div>
            {/* <p>This is a comment</p> */}
        </>

    )
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
import React from 'react';
import NewTravel from "../NewTravel/NewTravel";

const Home = () => {

    NewTravel
    const handleNewTravelClick = () => {
        console.log('New travel button clicked!');
    };

    return (
        <div>
            <h1>Home Page</h1>
            <NewTravel onClick={handleNewTravelClick} />
        </div>
    );
};

export default Home;

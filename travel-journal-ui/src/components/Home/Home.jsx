import React, {useState, useEffect} from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CardList from "../CardList/CardList.jsx";
import NewTravel from "../NewTravel/NewTravel.jsx";
import {API_URL} from "../../config.js";

const Home = () => {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const tokenType = localStorage.getItem("tokenType");

        fetch(`${API_URL}/travel-journal/my-travels`, {
            method: "GET",
            headers: {
                Authorization: `${tokenType} ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setEntities(data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const formatDate = (dateArray) => {
        const [year, month, day] = dateArray;
        return `${day}/${month}/${year}`;
    };

    let entitiesStorage = [];
    if (entities.length > 0) {
        entities.forEach(item => {
            entitiesStorage.push({
                id: item.travelId,
                image: item.coverPhoto.fileContent,
                city: item.location,
                startDate: formatDate(item.startDate),
                endDate: formatDate(item.endDate),
                price: item.budget,
                noNotes: item.notesNumber ? item.notesNumber : 0,
                currency: "lei"
            });
        });
    }


    return (
        <div>
            <h1>Home Page</h1>
            <Breadcrumbs/>
            {entities.length > 0 ? (
                <CardList entities={entitiesStorage} />
            ) : (
                <p>Nu aveți niciun travel</p>
            )}

            <NewTravel/>

        </div>

    );
};

export default Home;
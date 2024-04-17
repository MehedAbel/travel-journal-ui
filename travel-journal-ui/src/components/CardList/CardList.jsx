import React, {useState, useEffect} from "react";
import Card from "../Card/Card.jsx";
import NewTravel from "../NewTravel/NewTravel.jsx";
import {API_URL} from "../../config.js";
import TravelCardModal from '../Modal/TravelCardModal/TravelCardModal.jsx'
import '../CardList/index.css'

const CardList = () => {
    const [entities, setEntities] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [addCard, setAddCard] = useState(false);

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
            if(data && data.length > 0) {
                const tempData= [];
                data.forEach(item => {
                    tempData.push({
                        id: item.travelId,
                        image: item.coverPhoto.fileContent,
                        city: item.location,
                        startDate: item.startDate,
                        endDate: item.endDate,
                        price: item.budget,
                        noNotes: item.notesNumber ? item.notesNumber : 0,
                        currency: "lei"
                    });
                });
                setEntities(tempData);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, []);

    // Returns a Promise which, if unsuccessful, provides an error string do display,
    // or if successful, an empty string.
    const deleteCard = (cardId) => {
        const token = localStorage.getItem("token");
        const tokenType = localStorage.getItem("tokenType");

        var error = "";

        return fetch(`${API_URL}/travel-journal/travel/${cardId}`, {
              method: "DELETE",
              headers: {
                Authorization: `${tokenType} ${token}`,
                "Content-Type": "application/json; charset=UTF-8",
              },
        })
        .then((res) => {
            if (!res.ok) throw res;

            // Refresh the displayed cards by removing it locally from entities.
            setEntities((prev) => prev.filter(item => item.id !== cardId))

            return "";
        })
        .catch((error) => {
            //console.error("Error: ", error);
            return "Could not delete card!";
        });
    }

    const renderCards = entities.map((item) => {
        return <div key={item.id} className="col custom-col">
            <Card card={item} onEdit={() => setSelectedCard(item)} onDelete={() => deleteCard(item.id)} />
        </div>;
    });

    return (
        <div>
            {entities.length > 0 ? (
                <div className="d-flex flex-wrap flex-row p-2 gap-4">
                    {renderCards}
                </div>
            ) : (
                <p>Nu aveți niciun travel</p>
            )}
            <NewTravel onClick={() => setAddCard(true)} />

            {(selectedCard != null) && <TravelCardModal header={'Edit Travel'}
                                                        subheader={'Edit your travel details below.'}
                                                        card={selectedCard} onClose={() => setSelectedCard(null)}/>}

            {addCard && <TravelCardModal header={'Add Travel'}
                                         subheader={'Add your travel details below.'}
                                         onClose={() => setAddCard(false)}/>}
        </div>
    );
};

export default CardList;

import React, { useState, useEffect } from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CardList from '../CardList/CardList.jsx';
import NewTravel from '../NewTravel/NewTravel.jsx';
import { API_URL } from '../../config.js';
import TravelCardModal from '../Modal/TravelCardModal/TravelCardModal.jsx';

const Home = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [addCard, setAddCard] = useState(false);
    const [entities, setEntities] = useState([]);

    const loadCardList = async () => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('tokenType');
        fetch(`${API_URL}/travel-journal/my-travels`, {
            method: 'GET',
            headers: {
                Authorization: `${tokenType} ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) {
                    const tempData = [];
                    data.forEach((item) => {
                        tempData.push({
                            id: item.travelId,
                            imageId: item.coverPhotoId,
                            location: item.location,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            price: item.budget,
                            noNotes: item.notesNumber ? item.notesNumber : 0,
                            currency: 'lei',
                            description: item.description
                        });
                    });
                    setEntities(tempData);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useEffect(() => {
        loadCardList();
    }, []);

    return (
        <div>
            <Breadcrumbs />
            <CardList
                onEdit={(card) => setSelectedCard(card)}
                entities={entities}
                setEntities={setEntities}
            />
            <NewTravel onClick={() => setAddCard(true)} />

            {selectedCard != null && (
                <TravelCardModal
                    header={'Edit Travel'}
                    subheader={'Edit your travel details below.'}
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                    reloadCardList={loadCardList}
                />
            )}

            {addCard && (
                <TravelCardModal
                    header={'New Travel'}
                    subheader={'Add your travel details below.'}
                    onClose={() => setAddCard(false)}
                    reloadCardList={loadCardList}
                />
            )}
        </div>
    );
};

export default Home;

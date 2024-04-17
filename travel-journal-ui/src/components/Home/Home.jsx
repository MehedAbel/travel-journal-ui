import React, {useState, useEffect} from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CardList from "../CardList/CardList.jsx";
import NewTravel from "../NewTravel/NewTravel.jsx";
import TravelCardModal from '../Modal/TravelCardModal/TravelCardModal.jsx'

const Home = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [addCard, setAddCard] = useState(false);

    return (
        <div>
            <h1>Home Page</h1>
            <Breadcrumbs />
            <CardList onEdit={(card) => setSelectedCard(card)} />
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

export default Home;

import React, {useState} from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CardList from "../CardList/CardList.jsx";
import NewTravel from "../NewTravel/NewTravel.jsx";
import travelImage from '../../assets/login-bg.jpg';
import TravelCardModal from '../Modal/TravelCardModal/TravelCardModal.jsx'

const Home = () => {
    // todo: call api to get entitiesMock
    let entitiesMock = [
        {id: "1", image:travelImage, city: "Craiova", travelDate: "miercuri, 13 martie 2024", noNotes: "6", price: "200", currency: "lei"},
        {id: "2", image:travelImage, city: "Pitesti", travelDate: "miercuri, 13 martie 2024", noNotes: "12", price: "245", currency: "lei"},
        {id: "3", image:travelImage, city: "Bucuresti", travelDate: "miercuri, 13 martie 2024", noNotes: "2", price: "12", currency: "lei"},
        {id: "4", image:travelImage, city: "Orsova", travelDate: "miercuri, 13 martie 2024", noNotes: "5", price: "100", currency: "lei"},
        {id: "5", image:travelImage, city: "Iasi", travelDate: "miercuri, 13 martie 2024", noNotes: "4", price: "200", currency: "lei"},
        {id: "6", image:travelImage, city: "Timisoara", travelDate: "miercuri, 13 martie 2024", noNotes: "1", price: "400", currency: "lei"},
        {id: "7", image:travelImage, city: "Sibiu", travelDate: "miercuri, 13 martie 2024", noNotes: "2", price: "564", currency: "lei"},
        {id: "8", image:travelImage, city: "CLuj-Napoca", travelDate: "miercuri, 13 martie 2024", noNotes: "3", price: "1000", currency: "lei"}
    ];

    const [selectedCard, setSelectedCard] = useState(null);
    const [addCard, setAddCard] = useState(false);

    return (
        <div>
            <h1>Home Page</h1>
            <Breadcrumbs />
            <CardList entities={entitiesMock} onEdit={(card) => setSelectedCard(card)} />

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

import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "./App.css";
import Period from "./components/Period/Period";
import Location from "./components/Location/Location";
import { Details } from "./components/Details/Details";

const Card = (props) => {
    return <div className="card">{props.children}</div>;
};

const App = () => {
    const [trips, setTrips] = useState([
        {
            id: 1,
            location: "Romania",
            period: {
                startDate: "15.07.2023",
                endDate: "25.07.2023",
            },
            details: {
                budget: 1500,
                description: "Incredible landscapes and lots of history!",
            },
            images: ["img1.jpg", "img8.jpg"],
        },
        {
            id: 2,
            location: "Greece",
            period: {
                startDate: "01.08.2023",
                endDate: "15.08.2023",
            },
            details: {
                budget: 2500,
                description: "Beautiful beaches and delicious food!",
            },
            images: ["image00.jpg", "image01.jpg", "image02.jpg"],
        },
        {
            id: 3,
            location: "Moldova",
            period: {
                startDate: "01.09.2023",
                endDate: "19.09.2023",
            },
            details: {
                budget: 1300,
                description: "Interesting culture and friendly people!",
            },
            images: [
                "img1.jpg",
                "img8.jpg",
                "img1.jpg",
                "img8.jpg",
                "img1.jpg",
                "img8.jpg",
            ],
        },
    ]);

    const [isShown, setIsShown] = useState(false);

    const toggleShow = () => {
        setIsShown(!isShown);
    };

    const deleteCard = (id) => {
        setTrips(trips.filter((trip) => trip.id !== id));
    };

    return (
        <div>
            <button onClick={toggleShow}>
                {isShown ? "Hide Cards" : "Show Cards"}
            </button>

            {isShown ? (
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                    }}
                >
                    {trips.map((trip) => (
                        <Card key={trip.id}>
                            <button
                                onClick={() => deleteCard(trip.id)}
                                style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "25px",
                                    height: "25px",
                                }}
                            >
                                X
                            </button>
                            <Location location={trip.location} />
                            <Period
                                startDate={trip.period.startDate}
                                endDate={trip.period.endDate}
                            />
                            <Details
                                budget={trip.details.budget}
                                description={trip.details.description}
                            />
                            <div className="images">
                                <p>Images: </p>
                                {trip.images.map((image, index) => (
                                    <button key={index}>{image}</button>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div>No Cards Available</div>
            )}
        </div>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));
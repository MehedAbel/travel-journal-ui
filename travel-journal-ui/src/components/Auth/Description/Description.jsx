import "./../Login/Login.css";
import logoIcon from "../../../assets/TravelJournal.svg";

const Description = () => {
    return (
        <div className="login-description">
            <h3 className="login-description__subtitle">Welcome to</h3>
            <img
                className="login-description__logo"
                src={logoIcon}
                alt="logo"
            />
            <ul className="login-description__list">
                <li>Plan your trips easily.</li>
                <li>Have your notes in one place.</li>
                <li>Log your trip expenses.</li>
            </ul>
        </div>
    );
};

export default Description;

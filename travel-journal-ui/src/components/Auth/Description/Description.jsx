import styles from '../Login/Login.module.css';
import logoIcon from '../../../assets/TravelJournal.svg';

const Description = () => {
    return (
        <div className={styles['login-description']}>
            <h3 className={styles['login-description__subtitle']}>Welcome to</h3>
            <img className={styles['login-description__logo']} src={logoIcon} alt="logo" />
            <ul className={styles['login-description__list']}>
                <li>Plan your trips easily.</li>
                <li>Have your notes in one place.</li>
                <li>Log your trip expenses.</li>
            </ul>
        </div>
    );
};

export default Description;

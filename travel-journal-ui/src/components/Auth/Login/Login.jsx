import { useContext, useState } from 'react';

import sha256 from 'js-sha256';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../../context/AuthContext';
import { API_URL } from '../../../config';

import styles from './Login.module.css';
import logoIcon from '../../../assets/TravelJournal.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();

        const hashedPassword = sha256(password);

        if (!email) {
            setEmailError('Email address cannot be empty');
            setPasswordError('');
            return;
        }

        if (!password) {
            setEmailError('');
            setPasswordError('Password cannot be empty');
            return;
        }

        fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password: hashedPassword })
        })
            .then((res) => {
                if (!res.ok) throw res;

                return res.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('tokenType', data.type);
                setIsAuthenticated(true);
                navigate('/');
            })
            .catch((error) => {
                setEmailError('');

                if (error.status === 401) {
                    setPasswordError('The login credentials are incorrect');
                }

                if (error.status >= 500) {
                    setPasswordError('');

                    alert('Bad server connection. Try again later.');
                }

                console.error('Error: ', error);
            });
    };

    return (
        <div id={styles['login']}>
            <div className={styles['login-row']}>
                <div className={styles['login-description']}>
                    <h3 className={styles['login-description__subtitle']}>Welcome to</h3>
                    <img className={styles['login-description__logo']} src={logoIcon} alt="logo" />
                    <ul className={styles['login-description__list']}>
                        <li>Plan your trips easily.</li>
                        <li>Have your notes in one place.</li>
                        <li>Log your trip expenses.</li>
                    </ul>
                </div>
                <div className={styles['login-card']}>
                    <h3 className={styles['login-card__title']}>Log Into Your Account</h3>
                    <form onSubmit={submit} id="login-form" className={styles['login-form']}>
                        <div className={styles['login-form__input-field']}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="john.doe@domain.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError && (
                                <div className={styles['error-background']}>
                                    <div className={styles['error-message']}>{emailError}</div>
                                </div>
                            )}
                        </div>

                        <div className={styles['login-form__input-field']}>
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Type in your password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && (
                                <div className={styles['error-background']}>
                                    <div className={styles['error-message']}>{passwordError}</div>
                                </div>
                            )}
                        </div>
                    </form>

                    <Link className={styles['forgotPasswordLink']} to="/forgotPassword">
                        Forgot Password?
                    </Link>

                    <button
                        type="submit"
                        form="login-form"
                        className={styles['login-form__submit-btn']}
                    >
                        <h3>Log In</h3>
                    </button>

                    <p>
                        Don't have an account?{' '}
                        <Link className={styles['registerLink']} to="/register">
                            Sign Up
                        </Link>{' '}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

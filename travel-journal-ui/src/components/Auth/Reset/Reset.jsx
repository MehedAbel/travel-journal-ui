import { Fragment, useEffect, useState } from 'react';

import sha256 from 'js-sha256';

import { useLocation, useNavigate } from 'react-router-dom';

import { API_URL } from '../../../config';

import { REGEX, errorMessages } from '../../../constants/Validations.js';

import styles from '../Login/Login.module.css';
import Description from '../Description/Description.jsx';

const Reset = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();

    const resetToken = new URLSearchParams(useLocation().search).get('token');

    useEffect(() => {
        fetch(`${API_URL}/api/user/resetPassword/${resetToken}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) throw res;

                return res;
            })
            .then((data) => {})
            .catch((error) => {
                if (error.status === 401) {
                    alert('Token-ul a fost deja utilizat');
                    navigate('/forgotPassword');
                }
            });
    }, []);

    const validatePassword = () => {
        if (!password) {
            setPasswordError('Password cannot be empty');
            return false;
        }

        if (password !== confirmPassword) {
            setPasswordError(errorMessages.confirmPassword);
            return false;
        }

        if (!REGEX.password.test(password)) {
            setPasswordError(errorMessages.password);
            return false;
        }

        return true;
    };

    const submit = (e) => {
        e.preventDefault();

        const hashedPassword = sha256(password);

        if (!validatePassword()) return;

        fetch(`${API_URL}/api/user/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: resetToken, password: hashedPassword })
        })
            .then((res) => {
                if (!res.ok) throw res;

                return res;
            })
            .then((data) => {
                setIsSubmitted(true);
            })
            .catch((error) => {
                if (error.status === 404) {
                    setPasswordError('');
                    alert('Token-ul nu exista.');
                }

                if (error.status === 401) {
                    setPasswordError('');
                    alert('Token-ul a fost deja utilizat');
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
                <Description />

                <div className={styles['login-card']}>
                    {!isSubmitted ? (
                        <Fragment>
                            <h3 className={styles['login-card__title']}>Reset Password</h3>
                            <form
                                onSubmit={submit}
                                id="login-form"
                                className={styles['login-form']}
                            >
                                <div className={styles['login-form__input-field']}>
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Type in your new password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className={styles['login-form__input-field']}>
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="Confirm your new password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {passwordError && (
                                        <div className={styles['error-background']}>
                                            <div className={styles['error-message']}>
                                                {passwordError}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>

                            <button
                                type="submit"
                                form="login-form"
                                className={styles['login-form__submit-btn']}
                            >
                                <h3>Save New Password</h3>
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h3 className={styles['login-card__title']}>
                                Your password has been changed successfully.
                            </h3>
                            <button
                                className={styles['login-form__submit-btn']}
                                onClick={() => navigate('/login')}
                            >
                                <h3>Back to Login</h3>
                            </button>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reset;

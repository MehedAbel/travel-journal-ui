import { Fragment, useState } from 'react';

import { API_URL } from '../../../config';

import styles from '../Login/Login.module.css';
import Description from '../Description/Description.jsx';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRetryButton = () => {
        setEmail('');
        setEmailError('');
        setIsSubmitted(false);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError('Email address cannot be empty');
            return;
        }

        fetch(`${API_URL}/api/user/forgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then((res) => {
                if (!res.ok) throw res;

                return res;
            })
            .then((data) => {
                setIsSubmitted(true);
            })
            .catch((error) => {
                if (error.status === 400) {
                    setEmailError('');
                    alert('Ai un ticket neutilizat.');
                }

                if (error.status === 404) {
                    setEmailError('');
                    alert('Emailul nu exista.');
                }

                if (error.status >= 500) {
                    setEmailError('');
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
                            <h3 className={styles['login-card__title']}>Forgot Password</h3>
                            <form
                                onSubmit={submit}
                                id="login-form"
                                className={styles['login-form']}
                            >
                                <div className={styles['login-form__input-field']}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="john.doe@domain.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {emailError && (
                                        <div className={styles['error-background']}>
                                            <div className={styles['error-message']}>
                                                {emailError}
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
                                <h3>Reset Password</h3>
                            </button>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <h3 className={styles['login-card__title']}>
                                You will receive an email with the instructions for resetting your
                                password.
                            </h3>
                            <button
                                className={styles['login-form__submit-btn']}
                                onClick={handleRetryButton}
                            >
                                <h3>Retry</h3>
                            </button>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forgot;

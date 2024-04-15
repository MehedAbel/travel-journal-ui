import {Fragment, useState} from "react";

import { API_URL } from "../../../config";

import "./../Login/Login.css";
import logoIcon from "../../../assets/TravelJournal.svg";

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRetryButton = () => {
        setEmail("");
        setEmailError("");
        setIsSubmitted(false);
    }

    const submit = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError("Email address cannot be empty");
            return;
        }

        fetch(`${API_URL}/api/user/forgotPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
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
                    setEmailError("");
                    alert("Ai un ticket neutilizat.");
                }

                if (error.status === 404) {
                    setEmailError("");
                    alert("Emailul nu exista.");
                }

                if (error.status >= 500) {
                    setEmailError("");
                    alert("Bad server connection. Try again later.");
                }

                console.error("Error: ", error);
            });
    };

    return (
        <div id="login">
            <div className="login-row">
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

                <div className="login-card">
                    {!isSubmitted ?
                    (
                    <Fragment>
                        <h3 className="login-card__title">Forgot Password</h3>
                        <form onSubmit={submit} id="login-form" className="login-form">
                            <div className="login-form__input-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    placeholder="john.doe@domain.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && (
                                    <div className="error-background">
                                        <div className="error-message">{emailError}</div>
                                    </div>
                                )}
                            </div>
                        </form>

                        <button
                            type="submit"
                            form="login-form"
                            className="login-form__submit-btn"
                        >
                            <h3>Reset Password</h3>
                        </button>
                    </Fragment>
                    ) :
                    (
                    <Fragment>
                        <h3 className="login-card__title">
                            You will receive an email with the instructions for resetting your password.
                        </h3>
                        <button className="login-form__submit-btn" onClick={handleRetryButton}>
                            <h3>Retry</h3>
                        </button>
                    </Fragment>
                    )
                    }
                </div>
            </div>
        </div>
    );
}

export default Forgot;
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import sha256 from "js-sha256";

import { API_URL } from "../../../config";
import "./index.css";

// the keys have the same name as the input states
const REGEX = {
    firstName: /^[a-zA-Z ]+$/,
    lastName: /^[a-zA-Z ]+$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
}

const errorMessages = {
    firstName: "First Name must contain only letters or spaces",
    lastName: "Last Name must contain only letters or spaces",
    email: "Invalid email format",
    password: "Password must contain at least 8 characters including at least one upper and lowercase letter and a number.",
    confirmPassword: "Passwords do not match",
    emptyField: "This field is required",
}


const Register = () => {
    const navigate = useNavigate();

    const firstNameRef = useRef();

    const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        firstNameRef.current.focus();
    }, []);

    const getErrorMessage = (fieldName) => {
        const fieldValues = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }

        const fieldValue = fieldValues[fieldName];

        let errorMessage = null;
        const emptyFieldError = errorMessages["emptyField"];
        const invalidFieldError = errorMessages[fieldName];

        if (!fieldValue && wasFormSubmitted) {
            errorMessage = emptyFieldError;
        } else if (
            (fieldValue && fieldName === "confirmPassword" && password !== confirmPassword) ||
            (REGEX[fieldName] && !REGEX[fieldName].test(fieldValue) && fieldValue))
        { errorMessage = invalidFieldError; }

        return errorMessage ? <p>{errorMessage}</p> : null;
    }

    const isFormValid = () => {
        return (
            REGEX.firstName.test(firstName) &&
            REGEX.lastName.test(lastName) &&
            REGEX.email.test(email) &&
            REGEX.password.test(password) &&
            password === confirmPassword
        );
    }

    const submit = (e) => {
        e.preventDefault();
        setWasFormSubmitted(true);

        if (isFormValid()) {
            // const hashedPassword = sha256(password);

            // fetch(`${API_URL}/user`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ firstName, lastName, email, password: hashedPassword }),
            // })
            //     .then((res) => res.json())
            //     .then((data) => {
            //         console.log(data);
            //         if (data) {
            //             navigate("/login");
            //         }
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error);
            //     });

            console.log("User registered successfully!");

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            navigate('/login');
        } else {
            console.log("Form is invalid");
        }

    };


    return (
        <form onSubmit={submit} className="register-form" noValidate>
            <div className="input-field">
                <label htmlFor="first-name">First Name</label>
                <input
                    ref={firstNameRef}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    value={firstName}
                    id="first-name"
                    required
                />
                {getErrorMessage("firstName")}
            </div>

            <div className="input-field">
                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    value={lastName}
                    id="last-name"
                    required
                />
                {getErrorMessage("lastName")}
            </div>

            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@domain.com"
                    value={email}
                    id="email"
                    required
                />
                {getErrorMessage("email")}
            </div>

            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type in your password"
                    value={password}
                    id="password"
                    required
                />
                {getErrorMessage("password")}
            </div>

            <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype in your password"
                    value={confirmPassword}
                    id="confirm-password"
                    required
                />
                {getErrorMessage("confirmPassword")}
            </div>

            <button type="submit" className="submit-btn">
                Register
            </button>
            <span onClick={() => navigate("/login")} className="login-link">
                Already have an account?
            </span>
        </form>
    );
};

export default Register;

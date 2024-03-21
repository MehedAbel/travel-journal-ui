import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import sha256 from "js-sha256";

import { API_URL } from "../../../config";
import "./index.css";

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([
        {
            firstName: "johnny",
            lastName: "cash",
            email: "johnny.cash@test.com",
            password: 12345678,
        },
    ]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};

        if (!firstName) validationErrors.firstName = "First Name is required";
        if (!lastName) validationErrors.lastName = "Last Name is required";

        if (!email) {
            validationErrors.email = "Email is required"
        } else if (!email.includes('@')) {
            validationErrors.email = "Email address is invalid";
        }

        if (!password) {
            validationErrors.password = "Password is required"
        } else if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters long";
        }

        if (!confirmPassword) {
            validationErrors.confirmPassword = "This field is required";
        } else if (confirmPassword !== password) {
            validationErrors.confirmPassword = "Your password and confirmation password do not match";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }

    const submit = (e) => {
        e.preventDefault();

        if (validate()) {
            setData((prevState) => {
                return [
                    ...prevState,
                    {
                        firstName,
                        lastName,
                        email,
                        password,
                    },
                ];
            });

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

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            navigate('/login');
        }

    };


    return (
        <form onSubmit={submit} className="register-form">
            <div className="input-field">
                <label htmlFor="first-name">First Name</label>
                <input
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    value={firstName}
                    id="first-name"
                />
                {errors.firstName && <p>{errors.firstName}</p>}
            </div>

            <div className="input-field">
                <label htmlFor="last-name">Last Name</label>
                <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    value={lastName}
                    id="last-name"
                />
                {errors.lastName && <p>{errors.lastName}</p>}
            </div>

            <div className="input-field">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john.doe@domain.com"
                    value={email}
                    id="email"
                />
                {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type in your password"
                    value={password}
                    id="password"
                />
                {errors.password && <p>{errors.password}</p>}
            </div>

            <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Retype in your password"
                    value={confirmPassword}
                    id="confirm-password"
                />
                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
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

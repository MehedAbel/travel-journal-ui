import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import "./index.css";
import logo from "../../../assets/Logo-White.svg";

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
        <>
            <div className="d-flex flex-row justify-content-between align-items-center text-white pt-5">
                <div className="d-flex flex-column fs-3 w-50 text-shadow">
                    <p className="opacity-75">Welcome to</p>
                    <img src={logo} alt="logo" className="logo"/>
                    <ul className="pt-5">
                        <li> Plan your trips easily.</li>
                        <li> Have your notes in one place.</li>
                        <li> Log your trip expenses.</li>
                    </ul>
                </div>
                <div className="card rounded-4 border-1 border-black shadow" style={{width: "40%"}}>
                    <div className="card-body">
                        <div className="d-flex justify-content-center m-3">
                            <span className="card-title fs-3 font-weight-bold">Register Your Account</span>
                        </div>
                        <form onSubmit={submit} className="d-flex flex-column gap-2 align-items-center">
                            <div className="input-field">
                                <label htmlFor="first-name">First Name</label>
                                <input
                                    className="border border-dark rounded-3"
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John"
                                    value={firstName}
                                    id="first-name"
                                />
                                {errors.firstName && <p className="badge error-message">{errors.firstName}</p>}
                            </div>

                            <div className="input-field">
                                <label htmlFor="last-name">Last Name</label>
                                <input
                                    className="border border-dark rounded-3"
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Doe"
                                    value={lastName}
                                    id="last-name"
                                />
                                {errors.lastName && <p className="badge error-message">{errors.lastName}</p>}
                            </div>

                            <div className="input-field">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="border border-dark rounded-3"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john.doe@domain.com"
                                    value={email}
                                    id="email"
                                />
                                {errors.email && <p className="badge error-message">{errors.email}</p>}
                            </div>

                            <div className="input-field">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="border border-dark rounded-3"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Type in your password"
                                    value={password}
                                    id="password"
                                />
                                {errors.password && <p className="badge error-message">{errors.password}</p>}
                            </div>

                            <div className="input-field">
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input
                                    className="border border-dark rounded-3"
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Retype in your password"
                                    value={confirmPassword}
                                    id="confirm-password"
                                />
                                {errors.confirmPassword && <p className="badge error-message">{errors.confirmPassword}</p>}
                            </div>

                            <button type="submit" className="btn btn-dark rounded-3 w-100">
                                Register
                            </button>
                            <span>Do you have an account? <a href="/login" className="login-link">
                Log In
            </a></span>
                        </form>
                    </div>
                </div>
            </div>
        </>);
};

export default Register;

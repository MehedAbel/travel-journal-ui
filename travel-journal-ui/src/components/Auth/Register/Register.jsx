import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";

import sha256 from "js-sha256";

import {API_URL} from "../../../config";
import "./index.css";
import logo from "../../../assets/Logo-White.svg";
import login_bg from "../../../assets/login-bg.jpg";

// the keys have the same name as the input states
const REGEX = {
    firstName: /^[a-zA-Z]+$/,
    lastName: /^[a-zA-Z]+$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
}

const errorMessages = {
    firstName: "First Name must contain only letters and no spaces",
    lastName: "Last Name must contain only letters and no spaces",
    email: "Invalid email format",
    password: "Password must contain at least 8 characters including at least one upper and lowercase letter and a number.",
    confirmPassword: "Passwords do not match",
    emptyField: "This field is required",
}


const Register = () => {
    const navigate = useNavigate();

    const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

    const [formError, setFormError] = useState("");

    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const updateFormValue = (fieldName, value) => {
        setFormValues(prevState => (
            {
                ...prevState,
                [fieldName]: value,
            }
        ));
    }

    const inputRefs = useRef({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
    });

    const formErrorRef = useRef();

    useEffect(() => {
        setFormError("");
    }, [formValues, wasFormSubmitted]);

    useEffect(() => {
        inputRefs.current.firstName.focus();
    }, []);

    const getErrorMessage = (fieldName) => {
        const fieldValue = formValues[fieldName];

        let errorMessage = null;
        const emptyFieldError = errorMessages["emptyField"];
        const invalidFieldError = errorMessages[fieldName];

        const isPasswordMismatch = fieldValue && fieldName === "confirmPassword" && formValues.password !== formValues.confirmPassword;
        const isInvalidField = fieldValue && REGEX[fieldName] && !REGEX[fieldName].test(fieldValue);

        if (!fieldValue && wasFormSubmitted) {
            errorMessage = emptyFieldError;
        } else if (isPasswordMismatch || isInvalidField) {
            errorMessage = invalidFieldError;
        }

        if (errorMessage) {
            return (
                <div className="w-100" aria-live="polite">
                    <p className="badge text-wrap error-message" id={fieldName + "Error"}>{errorMessage}</p>
                </div>
            );
        } else {
            return ( // position the error offscreen to be available for screen readers
                <div className="w-100" aria-live="polite" style={{position: 'absolute', left: '-99999px'}}>
                    <p className="badge text-wrap error-message" id={fieldName + "Error"}>{invalidFieldError}</p>
                </div>
            );
        }
    }

    const isFormValid = () => {
        return (
            REGEX.firstName.test(formValues.firstName) &&
            REGEX.lastName.test(formValues.lastName) &&
            REGEX.email.test(formValues.email) &&
            REGEX.password.test(formValues.password) &&
            formValues.password === formValues.confirmPassword
        );
    }

    const submit = (e) => {
        e.preventDefault();
        setWasFormSubmitted(true);

        if (!isFormValid()) {
            for (let input in inputRefs.current) {
                if (REGEX[input] && !REGEX[input].test(inputRefs.current[input].value) || (input === "confirmPassword" && formValues.password !== formValues.confirmPassword)) {
                    const event = new Event('click'); // it doesn't read the error without this when using the screen reader
                    inputRefs.current[input].focus();
                    inputRefs.current[input].dispatchEvent(event);
                    return;
                }
            }
        }

        const hashedPassword = sha256(formValues.password);
        fetch(`${API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({firstname: formValues.firstName, lastname: formValues.lastName, email: formValues.email, password: hashedPassword}),
        })
            .then(response => {
                if (!response.ok) {
                    {
                        if (response.status === 400)
                            throw Error("Email already exits");
                        else
                            throw Error("Something went wrong!");
                    }
                }
                return response.json();
            })
            .then((user) => {
                if (user) {
                    navigate("/login");
                } else {
                    throw Error("Something went wrong!");
                }
            })
            .catch((error) => {
                setFormError(error.message);
                formErrorRef.current.focus();
            });
    };


    return (
        <div style={{
            backgroundImage: `url(${login_bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            display: "flex",
            alignItems: "center"
        }}>
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-center text-white pt-0">
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
                            <form onSubmit={submit} className="d-flex flex-column gap-2 align-items-center"
                                  noValidate>
                                <div className="w-100"><p className="badge text-wrap error-message"
                                                          ref={formErrorRef} aria-live="assertive">{formError}</p>
                                </div>
                                <div className="input-field">
                                    <label htmlFor="first-name">First Name</label>
                                    <input
                                        ref={(ref) => inputRefs.current.firstName = ref}
                                        id="first-name"
                                        className="border border-dark rounded-3"
                                        type="text"
                                        onChange={(e) => updateFormValue('firstName', e.target.value)}
                                        placeholder="John"
                                        autoComplete="given-name"
                                        value={formValues.firstName}
                                        required
                                        aria-required="true"
                                        aria-invalid={!REGEX.firstName.test(formValues.firstName) ? "true" : "false"}
                                        aria-describedby="firstNameError"
                                    />
                                    {getErrorMessage("firstName")}
                                </div>

                                <div className="input-field">
                                    <label htmlFor="last-name">Last Name</label>
                                    <input
                                        ref={(ref) => inputRefs.current.lastName = ref}
                                        id="last-name"
                                        className="border border-dark rounded-3"
                                        type="text"
                                        onChange={(e) => updateFormValue('lastName', e.target.value)}
                                        placeholder="Doe"
                                        autoComplete="family-name"
                                        value={formValues.lastName}
                                        required
                                        aria-required="true"
                                        aria-invalid={!REGEX.lastName.test(formValues.lastName) ? "true" : "false"}
                                        aria-describedby="lastNameError"
                                    />
                                    {getErrorMessage("lastName")}
                                </div>

                                <div className="input-field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        ref={(ref) => inputRefs.current.email = ref}
                                        id="email"
                                        className="border border-dark rounded-3"
                                        type="email"
                                        onChange={(e) => updateFormValue('email', e.target.value)}
                                        placeholder="john.doe@domain.com"
                                        autoComplete="email"
                                        value={formValues.email}
                                        required
                                        aria-required="true"
                                        aria-invalid={!REGEX.email.test(formValues.email) ? "true" : "false"}
                                        aria-describedby="emailError"
                                    />
                                    {getErrorMessage("email")}
                                </div>

                                <div className="input-field">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        ref={(ref) => inputRefs.current.password = ref}
                                        id="password"
                                        className="border border-dark rounded-3"
                                        type="password"
                                        onChange={(e) => updateFormValue('password', e.target.value)}
                                        placeholder="Type in your password"
                                        autoComplete="new-password"
                                        value={formValues.password}
                                        required
                                        aria-required="true"
                                        aria-invalid={!REGEX.password.test(formValues.password) ? "true" : "false"}
                                        aria-describedby="passwordError"
                                    />
                                    {getErrorMessage("password")}
                                </div>

                                <div className="input-field">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        ref={(ref) => inputRefs.current.confirmPassword = ref}
                                        id="confirm-password"
                                        className="border border-dark rounded-3"
                                        type="password"
                                        onChange={(e) => updateFormValue('confirmPassword', e.target.value)}
                                        placeholder="Retype in your password"
                                        autoComplete="new-password"
                                        value={formValues.confirmPassword}
                                        required
                                        aria-required="true"
                                        aria-invalid={formValues.password !== formValues.confirmPassword ? "true" : "false"}
                                        aria-describedby="confirmPasswordError"
                                    />
                                    {getErrorMessage("confirmPassword")}
                                </div>

                                <button type="submit" className="btn btn-dark rounded-3 w-100">
                                    Register
                                </button>
                                <span>Do you have an account? <a href="/login"
                                                                 className="login-link">Log In</a></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

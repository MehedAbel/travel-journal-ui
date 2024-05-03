import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import sha256 from 'js-sha256';

import { API_URL } from '../../../config';
import styles from './Register.module.css';
import logo from '../../../assets/Logo-White.svg';

import Error from '../../Error/Error.jsx';

import { REGEX, errorMessages } from '../../../constants/Validations.js';

const Register = () => {
    const navigate = useNavigate();

    const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

    const [formError, setFormError] = useState('');

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const inputRefs = useRef({
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null
    });

    const formErrorRef = useRef();

    useEffect(() => {
        setFormError('');
    }, [formValues, wasFormSubmitted]);

    useEffect(() => {
        inputRefs.current.firstName.focus();
    }, []);

    const updateFormValue = (fieldName, value) => {
        setFormValues((prevState) => ({
            ...prevState,
            [fieldName]: value
        }));
    };

    const isFieldInvalid = (fieldName) => {
        const fieldValue = formValues[fieldName];

        const isPasswordMismatch =
            fieldName === 'confirmPassword' && formValues.password !== formValues.confirmPassword;
        const isInvalidField = REGEX[fieldName] && !REGEX[fieldName].test(fieldValue);

        return isPasswordMismatch || isInvalidField;
    };

    const getErrorMessage = (fieldName) => {
        const fieldValue = formValues[fieldName];

        let errorMessage = null;
        const emptyFieldError = errorMessages['emptyField'];
        const invalidFieldError = errorMessages[fieldName];

        if (!fieldValue && wasFormSubmitted) {
            errorMessage = emptyFieldError;
        } else if (fieldValue && isFieldInvalid(fieldName)) {
            errorMessage = invalidFieldError;
        }

        if (errorMessage) {
            return <Error errorMessage={errorMessage} id={fieldName + 'Error'} />;
        }

        // keep the error message in the DOM for screen readers
        return (
            <Error
                errorMessage={invalidFieldError}
                id={fieldName + 'Error'}
                style={{ position: 'absolute', left: '-99999px' }}
            />
        );
    };

    const isFormValid = () => {
        return !(
            isFieldInvalid('firstName') ||
            isFieldInvalid('lastName') ||
            isFieldInvalid('email') ||
            isFieldInvalid('password') ||
            isFieldInvalid('confirmPassword')
        );
    };

    const submit = (e) => {
        e.preventDefault();
        setWasFormSubmitted(true);

        if (!isFormValid()) {
            for (let input in inputRefs.current) {
                if (isFieldInvalid(input)) {
                    const event = new Event('click'); // it doesn't read the error without this when using the screen reader
                    inputRefs.current[input].focus();
                    inputRefs.current[input].dispatchEvent(event);
                    return;
                }
            }
        }

        const hashedPassword = sha256(formValues.password);
        fetch(`${API_URL}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: formValues.firstName,
                lastname: formValues.lastName,
                email: formValues.email,
                password: hashedPassword
            })
        })
            .then((response) => {
                if (!response.ok) {
                    {
                        if (response.status === 400) throw Error('Email already exists');
                        else throw Error('Something went wrong!');
                    }
                }
                return response.json();
            })
            .then((user) => {
                if (user) {
                    navigate('/login');
                } else {
                    throw Error('Something went wrong!');
                }
            })
            .catch((error) => {
                setFormError(error.message);
                formErrorRef.current.focus();
            });
    };

    return (
        <div id={styles['register']}>
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-center text-white pt-0">
                    <div className={`d-flex flex-column fs-3 w-50 ${styles['text-shadow']}`}>
                        <p className="opacity-75">Welcome to</p>
                        <img src={logo} alt="logo" className="logo" />
                        <ul className="pt-5">
                            <li> Plan your trips easily.</li>
                            <li> Have your notes in one place.</li>
                            <li> Log your trip expenses.</li>
                        </ul>
                    </div>
                    <div
                        className="card rounded-4 border-1 border-black shadow"
                        style={{ width: '40%' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-center m-3">
                                <span className="card-title fs-3 font-weight-bold">
                                    Register Your Account
                                </span>
                            </div>
                            <form
                                onSubmit={submit}
                                className="d-flex flex-column gap-2 align-items-center"
                                noValidate>
                                <div ref={formErrorRef}>
                                    <Error errorMessage={formError} ariaLive="assertive" />
                                </div>
                                <div className={styles['input-field']}>
                                    <label htmlFor="first-name">First Name</label>
                                    <input
                                        ref={(ref) => (inputRefs.current.firstName = ref)}
                                        id="first-name"
                                        className="border border-dark rounded-3"
                                        type="text"
                                        onChange={(e) =>
                                            updateFormValue('firstName', e.target.value)
                                        }
                                        placeholder="John"
                                        autoComplete="given-name"
                                        value={formValues.firstName}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            isFieldInvalid('firstName') ? 'true' : 'false'
                                        }
                                        aria-describedby="firstNameError"
                                    />
                                    {getErrorMessage('firstName')}
                                </div>

                                <div className={styles['input-field']}>
                                    <label htmlFor="last-name">Last Name</label>
                                    <input
                                        ref={(ref) => (inputRefs.current.lastName = ref)}
                                        id="last-name"
                                        className="border border-dark rounded-3"
                                        type="text"
                                        onChange={(e) =>
                                            updateFormValue('lastName', e.target.value)
                                        }
                                        placeholder="Doe"
                                        autoComplete="family-name"
                                        value={formValues.lastName}
                                        required
                                        aria-required="true"
                                        aria-invalid={isFieldInvalid('lastName') ? 'true' : 'false'}
                                        aria-describedby="lastNameError"
                                    />
                                    {getErrorMessage('lastName')}
                                </div>

                                <div className={styles['input-field']}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        ref={(ref) => (inputRefs.current.email = ref)}
                                        id="email"
                                        className="border border-dark rounded-3"
                                        type="email"
                                        onChange={(e) => updateFormValue('email', e.target.value)}
                                        placeholder="john.doe@domain.com"
                                        autoComplete="email"
                                        value={formValues.email}
                                        required
                                        aria-required="true"
                                        aria-invalid={isFieldInvalid('email') ? 'true' : 'false'}
                                        aria-describedby="emailError"
                                    />
                                    {getErrorMessage('email')}
                                </div>

                                <div className={styles['input-field']}>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        ref={(ref) => (inputRefs.current.password = ref)}
                                        id="password"
                                        className="border border-dark rounded-3"
                                        type="password"
                                        onChange={(e) =>
                                            updateFormValue('password', e.target.value)
                                        }
                                        placeholder="Type in your password"
                                        autoComplete="new-password"
                                        value={formValues.password}
                                        required
                                        aria-required="true"
                                        aria-invalid={isFieldInvalid('password') ? 'true' : 'false'}
                                        aria-describedby="passwordError"
                                    />
                                    {getErrorMessage('password')}
                                </div>

                                <div className={styles['input-field']}>
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        ref={(ref) => (inputRefs.current.confirmPassword = ref)}
                                        id="confirm-password"
                                        className="border border-dark rounded-3"
                                        type="password"
                                        onChange={(e) =>
                                            updateFormValue('confirmPassword', e.target.value)
                                        }
                                        placeholder="Retype in your password"
                                        autoComplete="new-password"
                                        value={formValues.confirmPassword}
                                        required
                                        aria-required="true"
                                        aria-invalid={
                                            isFieldInvalid('confirmPassword') ? 'true' : 'false'
                                        }
                                        aria-describedby="confirmPasswordError"
                                    />
                                    {getErrorMessage('confirmPassword')}
                                </div>

                                <button type="submit" className="btn btn-dark rounded-3 w-100">
                                    Register
                                </button>
                                <span>
                                    Do you have an account?{' '}
                                    <a href="/login" className={styles['login-link']}>
                                        Log In
                                    </a>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

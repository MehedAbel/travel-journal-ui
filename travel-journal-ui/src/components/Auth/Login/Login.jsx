import { useContext, useState } from "react";

import sha256 from "js-sha256";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { API_URL } from "../../../config";

import "./Login.css";
import logoIcon from "../../../assets/TravelJournal.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password);

    if (!email) {
      setEmailError("Email address cannot be empty");
      setPasswordError("");
      return;
    }

    if (!password) {
      setEmailError("");
      setPasswordError("Password cannot be empty");
      return;
    }

    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: hashedPassword }),
    })
      .then((res) => {
        if (!res.ok) throw res;

        return res.json();
      })
      .then((data) => {
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((error) => {
        setEmailError("");

        if (error.status === 401) {
          setPasswordError("The login credentials are incorrect");
        }

        if (error.status >= 500) {
          setPasswordError("");

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
          <h3 className="login-card__title">Log Into Your Account</h3>
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

            <div className="login-form__input-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Type in your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                  <div className="error-background">
                    <div className="error-message">{passwordError}</div>
                  </div>
              )}
            </div>
          </form>

          <button
            type="submit"
            form="login-form"
            className="login-form__submit-btn"
          >
            <h3>Log In</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

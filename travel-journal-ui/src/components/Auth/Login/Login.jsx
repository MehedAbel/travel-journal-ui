import { useContext, useState } from "react";

import sha256 from "js-sha256";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import { API_URL } from "../../../config";

import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password);

    fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: hashedPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAuthenticated(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div id="login">
      <div className="login-row">
        <div className="login-description">
          <h3 className="login-description__subtitle">Welcome to</h3>
          <img
            className="login-description__logo"
            src="src/assets/TravelJournal.svg"
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
            </div>

            <div className="login-form__input-field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Type in your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </form>

          <button type="submit" form="login-form" className="login-form__submit-btn">
            <h3>Log In</h3>
          </button>

          {
            /*
            <span
              onClick={() => navigate("/register")}
              className="login-form__register-link"
            >
              <button>You can create an account here{" "}</button>
            </span>
            */
          }
        </div>
      </div>
    </div>
  );
};

export default Login;

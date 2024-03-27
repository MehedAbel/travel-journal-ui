import { useState } from "react";
import { useNavigate } from "react-router-dom";

import sha256 from "js-sha256";

import { API_URL } from "../../../config";
import "./index.css";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();

    const hashedPassword = sha256(password);

    fetch(`${API_URL}/api/user/saveuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, password: hashedPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={submit} className="register-form">
      <div className="input-field">
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="input-field">
        <label>Surname</label>
        <input type="text" onChange={(e) => setSurname(e.target.value)} />
      </div>

      <div className="input-field">
        <label>Email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input-field">
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
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

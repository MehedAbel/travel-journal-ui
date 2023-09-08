import React, { useState } from "react";

function App() {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};

        if (!name) validationErrors.name = "Name is required";
        if (!surname) validationErrors.surname = "Surname is required";
        if (!email) {
            validationErrors.email = "Email is required";
        } else if (!email.includes("@")) {
            validationErrors.email = "Email adress is invalid";
        }
        if (!password) {
            validationErrors.password = "Password is required";
        } else if (password.length < 8) {
            validationErrors.password = "Password must be at least 8 characters";
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validate()) {
            setData((prevState) => {
                return [
                    ...prevState,
                    {
                        name,
                        surname,
                        email,
                        password,
                    },
                ];
            });

            setName("");
            setSurname("");
            setEmail("");
            setPassword("");
        }
    };

    return (
        <>
            <main>
                <h1>User Form</h1>
                <form onSubmit={handleSubmit}>
                    {/* Name  */}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            placeholder="Write your name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    {/* Surname */}
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            placeholder="Write your surname"
                            id="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        {errors.surname && <p>{errors.surname}</p>}
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Write your password"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Write your password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <p>{errors.password}</p>}
                    </div>

                    {/* Submit */}
                    <button type="submit">Submit</button>
                </form>
            </main>
            <div>
                <h2>List of Users</h2>
                {data.map((u, index) => (
                    <p key={index}>
                        {u.name}, {u.surname}, {u.email}, {u.password}
                    </p>
                ))}
            </div>
        </>
    );
}

export default App;
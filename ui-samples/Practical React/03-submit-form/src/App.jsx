import React, { useState } from "react";

function App() {
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
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
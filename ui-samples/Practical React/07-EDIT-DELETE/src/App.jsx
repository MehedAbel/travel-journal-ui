import React, {useState, useEffect} from "react";
function App() {

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://13.73.187.21:8080/travel-journal/users"
                );
                const userData = await response.json();
                setData(userData);
            } catch (error) {
                console.log("Failed to fetch user data", error);
            }
        };
        fetchData();
    }, []);
    const validate = () => {
        const validationErrors = {};
        if (!name) validationErrors.name = "Name is required";
        if (!surname) validationErrors.surname = "Surname is required";
        if (!editMode) {
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
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const user = {
                name,
                surname,
                email,
                password,
            };
            try {
                const response = await fetch(
                    "http://13.73.187.21:8080/travel-journal/user",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(user),
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const userData = await response.json();
                setData((prevState) => {
                    return [...prevState, userData];
                });
                setName("");
                setSurname("");
                setEmail("");
                setPassword("");
                setEditMode(false);
                setCurrentUserId(null);
            } catch (error) {
                console.log("Failed To create user", error);
            }
        }
    };
    const handleEdit = (user) => {
        console.log("user", user);
        setEditMode(true);
        setCurrentUserId(user.userId);
        setName(user.name);
        setSurname(user.surname);
        setEmail(user.email);
        setPassword(user.password);
    };
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await fetch(
                    `http://13.73.187.21:8080/travel-journal/user/${currentUserId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name,
                            surname,
                        }),
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                setData((prevState) => {
                    return prevState.map((user) =>
                        user.id === currentUserId ? {...user, name, surname} : user
                    );
                });
                setName("");
                setSurname("");
                setEmail("");
                setPassword("");
                setEditMode(false);
                setCurrentUserId(null);
            } catch (error) {
                console.log("Failed To create user", error);
            }
        }
    };
    const handleDelete = async (user) => {
        console.log("user", user.userId);
        try {
            const response = await fetch(
                `http://13.73.187.21:8080/travel-journal/user/${user.userId}`,
                {
                    method: "DELETE",
                    headers: {

                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                // Removes the user from the list
                setData((prevData) => prevData.filter((u) => u.userId !== user.userId));
            } else {
                console.log("Failed to delete user");
            }
        } catch (error) {
            console.log("Failed to delete user", error);
        }
    };

    return (
        <>
            <main>
                <h1>User Form</h1>
                <form onSubmit={editMode ? handleUpdate : handleSubmit}>
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
                    {/* Email & Password*/}
                    {!editMode && (
                        <>
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
                        </>
                    )}
                    {/* Submit */}
                    <button type="submit">{editMode ? "Update" : "Submit"}</button>
                </form>
            </main>

            <div>
                <h2>List of Users</h2>
                {data.map((u, index) => (
                    <div key={index}>
                        <p>
                            {u.name}, {u.surname}, {u.email}

                        </p>
                        <button type="button"
                                onClick={() => handleEdit(u)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(u)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    );
}


export default App;
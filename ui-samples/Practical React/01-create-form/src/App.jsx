function App() {
    return (
        <>
            <main>
                <h1>User Form</h1>
                <form>
                    {/* Name  */}
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="Write your name" id="name" />
                    </div>
                    {/* Surname */}
                    <div>
                        <label htmlFor="surname">Surname</label>
                        <input type="text" placeholder="Write your surname" id="surname" />
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Write your password" id="email" />
                    </div>
                    {/* Password */}
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Write your password"
                            id="password"
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit">Submit</button>
                </form>
            </main>
        </>
    );
}

export default App;
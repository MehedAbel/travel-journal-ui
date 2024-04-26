import { useContext } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

import Home from './components/Home/Home';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import Forgot from './components/Auth/Forgot/Forgot';
import Reset from './components/Auth/Reset/Reset';

import './App.css';
import Navbar from './components/Nav/Navbar';
import Content from './components/Content/Content';
import TravelDetails from './components/TravelDetails/TravelDetails.jsx';

function App() {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="app-container">
            {isAuthenticated && <Navbar />}

            <Routes>
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route
                    path="/register"
                    element={isAuthenticated ? <Navigate to="/" /> : <Register />}
                />
                <Route path="/forgotPassword" element={<Forgot />}></Route>
                <Route path="/resetPassword" element={<Reset />}></Route>
                <Route element={<Content />}>
                    <Route
                        path="/"
                        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
                    />

                    <Route
                        path="/:location"
                        element={isAuthenticated ? <TravelDetails /> : <Navigate to="/login" />}
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

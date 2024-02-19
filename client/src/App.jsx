import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { AuthProvider } from './AuthContext';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;

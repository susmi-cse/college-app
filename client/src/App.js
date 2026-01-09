import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Transport from './pages/Transport';
import Marketplace from './pages/Marketplace';
import Canteen from './pages/Canteen';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">College Super App</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/market">Marketplace</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/canteen">Canteen</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/transport">Transport</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/market" element={<Marketplace />} />
                    <Route path="/canteen" element={<Canteen />} />
                    <Route path="/transport" element={<Transport />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

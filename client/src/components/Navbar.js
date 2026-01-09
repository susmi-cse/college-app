import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    };

    const linkStyle = {
        margin: '0 1rem',
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500'
    };

    return (
        <nav style={navStyle}>
            <h2 style={{ margin: 0, color: '#007bff' }}>CollegeApp</h2>
            <div>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/market" style={linkStyle}>Market</Link>
                <Link to="/canteen" style={linkStyle}>Canteen</Link>
                <Link to="/transport" style={linkStyle}>Transport</Link>
                <Link to="/login" style={linkStyle}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;

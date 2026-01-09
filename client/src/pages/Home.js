import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const containerStyle = {
        padding: '3rem',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
    };

    const cardStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer'
    };

    const iconStyle = {
        fontSize: '3rem',
        marginBottom: '1rem'
    };

    const titleStyle = {
        margin: '0.5rem 0',
        color: '#2c3e50'
    };

    const descStyle = {
        color: '#666',
        fontSize: '0.9rem'
    };

    return (
        <div style={containerStyle}>
            <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Welcome to Campus Super App</h1>
            <p style={{ color: '#7f8c8d', fontSize: '1.2rem' }}>Everything you need for college life, in one place.</p>

            <div style={gridStyle}>
                <Link to="/market" style={cardStyle}>
                    <div style={iconStyle}>🛒</div>
                    <h2 style={titleStyle}>Marketplace</h2>
                    <p style={descStyle}>Buy and sell books, gadgets, and more within campus.</p>
                </Link>

                <Link to="/canteen" style={cardStyle}>
                    <div style={iconStyle}>🍔</div>
                    <h2 style={titleStyle}>Canteen</h2>
                    <p style={descStyle}>Order food online and skip the long queues.</p>
                </Link>

                <Link to="/transport" style={cardStyle}>
                    <div style={iconStyle}>🚗</div>
                    <h2 style={titleStyle}>Transport</h2>
                    <p style={descStyle}>Find or offer rides. Commute easier.</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transport = () => {
    const [rides, setRides] = useState([]);
    const [formData, setFormData] = useState({
        origin: 'Main Gate',
        destination: 'Hostel',
        time_of_dept: '',
        price: ''
    });

    const locations = ['Main Gate', 'Hostel', 'Library', 'Canteen', 'Sports Complex'];

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/transport');
            setRides(res.data);
        } catch (err) {
            console.error('Error fetching rides:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/transport', {
                driver_id: 1,
                ...formData
            });
            fetchRides();
            setFormData({ ...formData, time_of_dept: '', price: '' });
        } catch (err) {
            console.error('Error offering ride:', err);
        }
    };

    return (
        <div className="row">
            <div className="col-md-5 mb-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Offer a Ride</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">From</label>
                                <select className="form-select" name="origin" value={formData.origin} onChange={handleChange}>
                                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">To</label>
                                <select className="form-select" name="destination" value={formData.destination} onChange={handleChange}>
                                    {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Time</label>
                                <input type="text" className="form-control" name="time_of_dept" placeholder="e.g. 10:00 AM" value={formData.time_of_dept} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="number" className="form-control" name="price" placeholder="₹" value={formData.price} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Post Ride</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="col-md-7">
                <h4 className="mb-3">Available Rides</h4>
                {rides.length === 0 ? <p className="text-muted">No rides available currently.</p> : (
                    <div className="row">
                        {rides.map(ride => (
                            <div key={ride.id} className="col-12 mb-3">
                                <div className="card">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="card-title">{ride.origin} <i className="bi bi-arrow-right"></i> {ride.destination}</h5>
                                            <p className="card-text text-muted mb-0">Leaving at: {ride.time_of_dept}</p>
                                        </div>
                                        <div>
                                            <span className="badge bg-success fs-5">₹{ride.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transport;

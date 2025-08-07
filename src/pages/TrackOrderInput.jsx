import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrackCargo.css'; 

const TrackOrderInput = () => {
    const [orderId, setOrderId] = useState('');
    const navigate = useNavigate();

    const handleTrackOrder = (e) => {
        e.preventDefault();
        if (orderId.trim()) {
            navigate(`/track/${orderId.trim().toUpperCase()}`);
        } else {
            alert("Please enter a valid tracking number.");
        }
    };

    return (
        <div className="track-cargo-container">
            <main>
                <section className="track-input-section">
                    <h2>Track Your Shipment</h2>
                    <p>
                        Please enter your tracking number below to see the
                        real-time status of your order.
                    </p>
                    <form onSubmit={handleTrackOrder} className="track-input-form">
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Enter Tracking ID (e.g., HF1234)"
                            className="track-input-field"
                        />
                        <button type="submit" className="track-submit-button">
                            Track Order
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default TrackOrderInput;
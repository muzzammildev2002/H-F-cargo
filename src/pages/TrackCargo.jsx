import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase.js';
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api';
import './TrackCargo.css'; 

const TrackCargo = () => {
    const [shipment, setShipment] = useState(null);
    const [error, setError] = useState(null);
    const { orderId } = useParams();
    const navigate = useNavigate(); 

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    useEffect(() => {
        if (!orderId) {
            setError("No Order ID provided.");
            return;
        }
        const docRef = doc(db, "orders", orderId);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setShipment(doc.data());
                setError(null); 
            } else {
                setShipment(null); 
                setError("This order does not exist. Please check the ID and try again.");
            }
        }, (err) => {
            console.error("Firebase error:", err);
            setError("Failed to fetch shipment data.");
        });
        return () => unsubscribe();
    }, [orderId]);

    const mapContainerStyle = {
        width: '100%',
        height: '400px'
    };
    
    if (error || !shipment || !isLoaded || loadError) {
        return (
            <div className="track-cargo-container">
                <header className="track-cargo-header">
                    <button className="back-arrow" onClick={() => navigate('/track')}>←</button>
                    <h1>Order Tracking</h1>
                </header>
                <div className="details-card" style={{ textAlign: 'center' }}>
                    <h2>Status</h2>
                    {error && <p>{error}</p>}
                    {loadError && <p>Error loading maps. Please check your API key.</p>}
                    {!error && !loadError && <p>Loading Shipment Details...</p>}
                </div>
            </div>
        );
    }
    
    const travelPath = [
        shipment.origin.coordinates,
        shipment.currentLocation,
        shipment.destination.coordinates
    ];

    return (
        <div className="track-cargo-container">
            <header className="track-cargo-header">
                <button className="back-arrow" onClick={() => navigate('/track')}>←</button>
                <h1>Submit Order</h1>
            </header>

            <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <section className="details-card">
                    <h2>Order Details</h2>
                    <div className="detail-item"><span>Order Number</span><span>{shipment.orderNumber}</span></div>
                    <div className="detail-item"><span>Cargo Type</span><span>{shipment.cargoType}</span></div>
                    <div className="detail-item"><span>Weight</span><span>{shipment.weight} kg</span></div>
                    <div className="detail-item"><span>Dimensions</span><span>{shipment.dimensions}</span></div>
                    <div className="detail-item"><span>Origin</span><span>{shipment.origin.name}</span></div>
                    <div className="detail-item"><span>Destination</span><span>{shipment.destination.name}</span></div>
                </section>

                <section className="details-card">
                     <h2>Status</h2>
                    <div className="status-info">
                        <div className="status-icon">
                           <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
                        </div>
                        <div className="status-text">
                            <p>{shipment.status}</p>
                            <p className="estimated-delivery">Estimated Delivery: {shipment.estimatedDelivery}</p>
                        </div>
                    </div>
                </section>

                <section className="map-container">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={shipment.currentLocation}
                        zoom={7}
                        options={{ streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
                    >
                        <Marker position={shipment.origin.coordinates} label={{ text: "O", color: "white" }} />
                        <Marker position={shipment.destination.coordinates} label={{ text: "D", color: "white" }} />
                        <Marker position={shipment.currentLocation} icon={'http://maps.google.com/mapfiles/ms/icons/truck.png'} />
                        <Polyline path={travelPath} options={{ strokeColor: '#007bff', strokeWeight: 5 }} />
                    </GoogleMap>
                </section>
            </main>
        </div>
    );
};

export default TrackCargo;
import React, { useState, useEffect } from 'react';
import './Booking.css';
import { db } from '../firebase';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const generateCustomOrderId = () => {
    const prefix = "HF";
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}${randomNumber}`;
};

const initialFormData = {
  origin: '',
  destination: '',
  cargoType: '',
  weight: '',
  dimension: '',
  contactNumber: '',
  email: ''
};

const BookingForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 
  
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState(() => {
    const data = { ...initialFormData };
    for (const [key, value] of searchParams.entries()) {
      if (key in data) {
        data[key] = value;
      }
    }
    return data;
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      setFormData(prevState => ({
        ...prevState,
        email: user.email
      }));
    }
  }, [user]);

  const handleNext = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    let tempErrors = {};
    if (!formData.origin.trim()) tempErrors.origin = "Origin is required.";
    if (!formData.destination.trim()) tempErrors.destination = "Destination is required.";
    if (!formData.cargoType.trim()) tempErrors.cargoType = "Cargo Type is required.";
    if (!formData.weight.trim()) tempErrors.weight = "Weight is required.";
    if (!formData.dimension.trim()) tempErrors.dimension = "Dimension is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateStep2 = () => {
    let tempErrors = {};
    if (!formData.contactNumber.trim()) tempErrors.contactNumber = "Contact Number is required.";
    if (!formData.email.trim()) {
        tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email address is invalid.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    if (!user) {
        alert("You must be logged in to submit a booking.");
        navigate('/login');
        return;
    }

    setIsLoading(true);

    try {
      const newOrderId = generateCustomOrderId();
      const orderData = {
        cargoType: formData.cargoType,
        weight: formData.weight,
        dimension: formData.dimension,
        contactNumber: formData.contactNumber,
        email: formData.email,
        origin: {
          name: formData.origin,
          coordinates: { lat: 40.7128, lng: -74.0060 } 
        },
        destination: {
          name: formData.destination,
          coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        orderNumber: newOrderId, 
        status: 'Booked',
        currentLocation: { lat: 40.7128, lng: -74.0060 }, 
        createdAt: serverTimestamp(),
        userId: user.uid
      };

      const orderDocRef = doc(db, "orders", newOrderId);
      await setDoc(orderDocRef, orderData);

      alert(`Your order has been submitted successfully!\nYour Tracking Number is: ${newOrderId}`);
      navigate(`/track/${newOrderId}`);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <span className="back-arrow" onClick={handleBack} style={{ visibility: step === 2 ? 'visible' : 'hidden' }}>
          ←
        </span>
        <h1>{step === 1 ? 'Book' : 'Submit Order'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        {/* Step 1: Shipment Details */}
        <div className={`form-step ${step === 1 ? 'form-step-active' : ''}`}>
           <h2>Shipment Details</h2>
          <div className="form-group"><input type="text" name="origin" placeholder="Origin" value={formData.origin} onChange={handleChange} required />{errors.origin && <p className="error-message">{errors.origin}</p>}</div>
          <div className="form-group"><input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />{errors.destination && <p className="error-message">{errors.destination}</p>}</div>
          <div className="form-group"><input type="text" name="cargoType" placeholder="Cargo Type" value={formData.cargoType} onChange={handleChange} required />{errors.cargoType && <p className="error-message">{errors.cargoType}</p>}</div>
          <div className="form-group"><input type="text" name="weight" placeholder="Weight (Kg)" value={formData.weight} onChange={handleChange} required />{errors.weight && <p className="error-message">{errors.weight}</p>}</div>
          <div className="form-group"><input type="text" name="dimension" placeholder="Dimension (Cm)" value={formData.dimension} onChange={handleChange} required />{errors.dimension && <p className="error-message">{errors.dimension}</p>}</div>
          <button type="button" className="btn" onClick={handleNext}>Next</button>
        </div>

        {/* Step 2: Submit Order */}
        <div className={`form-step ${step === 2 ? 'form-step-active' : ''}`}>
           <div className="form-group"><input type="text" name="cargoType" placeholder="Cargo Type" value={formData.cargoType} readOnly /></div>
           <div className="form-group"><input type="text" name="weight" placeholder="Weight (Kg)" value={formData.weight} readOnly /></div>
           <div className="form-group"><input type="text" name="dimension" placeholder="Dimension (Cm)" value={formData.dimension} readOnly /></div>
           <div className="form-group"><input type="text" name="origin" placeholder="Origin" value={formData.origin} readOnly /></div>
           {/* --- THE FIX IS HERE: `read.Only` changed to `readOnly` --- */}
           <div className="form-group"><input type="text" name="destination" placeholder="Destination" value={formData.destination} readOnly /></div>
           <div className="form-group"><input type="tel" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />{errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}</div>
           <div className="form-group"><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required readOnly={!!user} />{errors.email && <p className="error-message">{errors.email}</p>}</div>
          
           <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Order'}
           </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
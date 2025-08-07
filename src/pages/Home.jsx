import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./Home.css";

export default function Home() {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const [quoteDetails, setQuoteDetails] = useState({
    cargoType: '',
    weight: '',
    origin: '',
    destination: ''
  });

  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTrack = () => {
    if (trackingId.trim()) {
      navigate(`/track/${trackingId.trim().toUpperCase()}`);
    } else {
      alert("Please enter a tracking ID.");
    }
  };

  const handleGetQuote = (event) => {
    event.preventDefault();
    
    const queryParams = new URLSearchParams(quoteDetails).toString();
    
    navigate(`/booking?${queryParams}`);
  };

  return (
    <div className="home">
      <section
        id="hero"
        className="hero"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20logistics%20warehouse%20with%20trucks%20and%20containers%20in%20Pakistan%2C%20professional%20cargo%20transportation%20facility%20with%20clear%20blue%20sky%2C%20left%20side%20has%20subtle%20white%20gradient%20overlay%20for%20text%20readability%2C%20modern%20industrial%20setting%20with%20organized%20shipping%20containers%20and%20delivery%20trucks%2C%20clean%20professional%20atmosphere&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content-container">
          <div className="hero-content">
            <h1 className="main-heading">
              Reliable Cargo Services
              <span className="heading-span">Across Pakistan</span>
            </h1>
            <p className="main-paragraph">
              Professional logistics solutions for containerized cargo and open
              goods transportation. Connecting cities and remote areas with
              trusted delivery services.
            </p>
            <div className="track-box">
              <h3 className="track-box-heading">
                Track Your Cargo
              </h3>
              <div className="track-form">
                <input
                  type="text"
                  placeholder="Enter tracking ID"
                  className="track-input"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
                <button className="track-button" onClick={handleTrack}>
                  Track Now
                </button>
              </div>
            </div>
            <div className="stats">
              <div>
                <div className="stat-number">150+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
              <div>
                <div className="stat-number">500+</div>
                <div className="stat-label">Fleet Size</div>
              </div>
              <div>
                <div className="stat-number">50K+</div>
                <div className="stat-label">Deliveries</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="services-section">
        <h2>Our Services</h2>
        <p>
          Comprehensive logistics solutions tailored to meet your cargo
          transportation needs across Pakistan.
        </p>
        <div className="services">
          <div className="service-box">
            <h3>Container Cargo Transport</h3>
            <p>
              Secure containerized shipping for valuable goods with tracking and
              insurance. Ideal for commercial shipments.
            </p>
            <Link to="/services" className="service-button">Learn More</Link>
          </div>
          <div className="service-box">
            <h3>Open Load Transport</h3>
            <p>
              Flexible transport for oversized cargo and bulk goods. Ideal for
              construction and heavy equipment.
            </p>
            <Link to="/services" className="service-button">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <h2>Get a Quick Quote</h2>
        <p>Fill in your cargo details and get an instant shipping quote</p>
        <form className="quote-form" onSubmit={handleGetQuote}>
          <input 
            type="text" 
            name="cargoType" 
            placeholder="Cargo Type" 
            value={quoteDetails.cargoType} 
            onChange={handleQuoteChange} 
          />
          <input 
            type="number" 
            name="weight" 
            placeholder="Weight (kg)" 
            value={quoteDetails.weight} 
            onChange={handleQuoteChange} 
          />
          <input 
            type="text" 
            name="origin" 
            placeholder="Pickup Location" 
            value={quoteDetails.origin} 
            onChange={handleQuoteChange} 
          />
          <input 
            type="text" 
            name="destination" 
            placeholder="Delivery Location" 
            value={quoteDetails.destination} 
            onChange={handleQuoteChange} 
          />
          <button type="submit">Get Quote</button>
        </form>
      </section>
    </div>
  );
}
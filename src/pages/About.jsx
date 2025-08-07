import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="overlay">
          <div className="about-hero-content">
            <h1>About <span>H&F Cargo</span></h1>
            <p>Delivering Trust Across Pakistan</p>
          </div>
        </div>
      </section>

      <section className="about-intro">
        <div className="container">
          <h2>Who We Are</h2>
          <p>
            H&F Cargo is a leading logistics and cargo transportation company in Pakistan, known
            for reliable, secure and timely services. With a fleet covering 150+ cities and decades
            of experience, we make cargo movement efficient and hassle-free.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="container values-grid">
          <div className="value-box">
            <h3>Our Mission</h3>
            <p>
              To connect businesses and individuals across Pakistan through
              professional, safe and seamless logistics solutions.
            </p>
          </div>
          <div className="value-box">
            <h3>Our Vision</h3>
            <p>
              To be Pakistan’s most trusted cargo partner, recognized for
              service excellence and innovation in logistics.
            </p>
          </div>
          <div className="value-box">
            <h3>Core Values</h3>
            <ul>
              <li>Reliability</li>
              <li>Integrity</li>
              <li>Customer Satisfaction</li>
              <li>Innovation</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container stats-grid">
          <div>
            <h2>150+</h2>
            <p>Cities Covered</p>
          </div>
          <div>
            <h2>500+</h2>
            <p>Fleet Size</p>
          </div>
          <div>
            <h2>50K+</h2>
            <p>Deliveries</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

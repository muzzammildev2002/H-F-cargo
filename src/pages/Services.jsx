import React from "react";
import "./Services.css";

export default function Services() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="overlay">
          <h1>Our Services</h1>
          <p>Empowering your logistics with dependable cargo transportation across Pakistan.</p>
        </div>
      </section>

      <section className="services-intro container">
        <h2>Comprehensive Logistics Solutions</h2>
        <p>
          H&F Cargo specializes in two primary modes of freight transport:
          <strong> Container-Based Transport </strong> and
          <strong> Open Load Transport</strong>. Our services are engineered to deliver
          efficiency, security, and nationwide reach.
        </p>
      </section>

      <section className="service pair">
        <div className="service-box">
          <div className="service-img">
            <img
              src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Container Truck"
            />
          </div>
          <div className="service-text">
            <h3>Container Cargo Transport</h3>
            <p>
              Our container-based solutions provide maximum protection for industrial and
              commercial shipments. With advanced GPS tracking, insured delivery, and
              climate-controlled options, your cargo arrives safely and on time. Ideal for:
            </p>
            <ul>
              <li>Electronics and appliances</li>
              <li>Fragile goods</li>
              <li>High-value commercial shipments</li>
            </ul>
          </div>
        </div>

        <div className="service-box">
          <div className="service-img">
            <img
              src="https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=800&q=80"
              alt="Open Load Truck"
            />
          </div>
          <div className="service-text">
            <h3>Open Load Transport</h3>
            <p>
              Flexible and scalable, open-load transport is perfect for moving oversized,
              heavy, or irregular cargo. We offer modern flatbed trucks, trained handlers,
              and route optimization for timely delivery. Best suited for:
            </p>
            <ul>
              <li>Construction materials</li>
              <li>Heavy machinery</li>
              <li>Bulk agricultural loads</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="why-choose-us container">
        <h2>Why Choose H&F Cargo?</h2>
        <div className="reasons-grid">
          <div className="reason">
            <h4>150+ Cities Covered</h4>
            <p>Extensive coverage across urban and rural areas in Pakistan.</p>
          </div>
          <div className="reason">
            <h4>Real-time Tracking</h4>
            <p>Live updates from pickup to delivery with our smart tracking system.</p>
          </div>
          <div className="reason">
            <h4>Experienced Team</h4>
            <p>Decades of experience in handling diverse logistics challenges.</p>
          </div>
          <div className="reason">
            <h4>Dedicated Support</h4>
            <p>24/7 customer assistance for all booking, tracking, and support needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

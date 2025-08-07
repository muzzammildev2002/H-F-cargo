import "./Footer.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-col logo-col">
            <h2 className="footer-logo">H&F Cargo</h2>
            <p>
              Professional logistics solutions connecting Pakistan with reliable cargo transportation services.
            </p>
            <div className="social-icons">
             
              <a href="https://www.facebook.com/muzammil.rasheed.50596" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              
              <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              
              <a href="https://www.linkedin.com/in/muzammil-rasheed-241a66259/" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Our Services</a></li>
              <li><a href="/track">Track Cargo</a></li>
              <li><a href="/booking">Book Shipment</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li>Container Transport</li>
              <li>Open Load</li>
              <li>Express Delivery</li>
              <li>Warehousing</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="contact-list">
              {/* Updated phone number */}
              <li><FaPhoneAlt /> +92 313 2363955</li>
              <li><HiOutlineMail /> info@hfcargo.pk</li>
              <li><FaMapMarkerAlt /> Karachi, Lahore, Islamabad Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © 2024 H&F Cargo Services. All rights reserved.
        </div>
      </footer>

      
      <a
        href="https://wa.me/923132363955"
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/whatsapp.png" alt="WhatsApp" />
      </a>
    </>
  );
}
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/AuthContext.jsx"; 

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">H&F <span className="cargo-text">Cargo</span></span>
        </Link>

        <ul className="navbar-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/services">Services</NavLink></li>
          <li><NavLink to="/booking">Booking</NavLink></li>
          <li><NavLink to="/track">Track Cargo</NavLink></li>
          
        </ul>

        <div className="navbar-right">
          
          {user ? (
            <button onClick={handleLogout} className="book-now-btn">Logout</button>
          ) : (
            <Link to="/login" className="book-now-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
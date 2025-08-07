import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './AuthForm.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    setEmail('');
    setPassword('');
    setRememberMe(false);
    setError('');

    if (emailRef.current) {
      emailRef.current.value = '';
    }
    if (passwordRef.current) {
      passwordRef.current.value = '';
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          fullName: user.displayName,
          email: user.email,
        });
      }
      navigate('/');
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <button className="help-icon">?</button>
          <h2>Log in to Cargo Booking</h2>
        </div>
        <form onSubmit={handleLogin} className="auth-form" autoComplete="off">
          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <div className="options-container">
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
            
            <div className="remember-me">
              <label htmlFor="remember">Remember Me</label>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Login</button>
        </form>
        <button onClick={() => navigate('/signup')} className="auth-button secondary">Create Account</button>
        <div className="auth-footer-login">
          <button onClick={handleGoogleSignIn} className="google-signin-button">
            Sign In with Google
          </button>
          <p>By continuing, you agree to our Terms of Service to learn how we collect, use and share your data</p>
        </div>
      </div>
    </div>
  );
}
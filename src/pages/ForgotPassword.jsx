import React, { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase'; 
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSendInstructions = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setIsLoading(true);

        try {
            // This is the URL of the page where users will reset their password.
            // Firebase will send an email with a link pointing to this URL.
            const actionCodeSettings = {
                url: `${window.location.origin}/reset-password`,
                handleCodeInApp: true,
            };

            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            
            setSuccessMessage('Success! Check your email inbox for a link to reset your password.');

        } catch (err) {
            // Handle specific Firebase errors for a better user experience
            if (err.code === 'auth/user-not-found') {
                setError('No account exists with this email address.');
            } else {
                setError('Failed to send reset email. Please try again later.');
            }
            console.error("Firebase Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-text">
                    Enter your account's email address and we will send you a password reset link.
                </p>
                <form onSubmit={handleSendInstructions}>
                    <input
                        type="email"
                        className="auth-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                    />
                    {error && <p className="auth-error-text" style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p className="auth-success-text" style={{ color: 'green' }}>{successMessage}</p>}
                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
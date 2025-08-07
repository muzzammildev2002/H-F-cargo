import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from '../firebase';
import './ResetPassword.css'; 

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('Verifying your reset link...'); 
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode');

    useEffect(() => {
        if (!oobCode) {
            setStatus(null); 
            setError("Invalid request. Please get a new password reset link.");
            return;
        }

        verifyPasswordResetCode(auth, oobCode)
            .then(() => {
                setStatus(null); 
            })
            .catch(() => {
                setStatus(null); 
                setError("The password reset link is invalid or has expired. Please try again.");
            });
    }, [oobCode]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError(''); 

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            alert('Password has been changed successfully! You can now log in.');
            navigate('/login');
        } catch (err) {
            setError("Failed to change password. The link may have expired or been used already.");
            console.error("Firebase Error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    if (status || (!oobCode && error)) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h1 className="auth-title">Reset Password</h1>
                    {status && <p className="auth-feedback-text auth-verifying-text">{status}</p>}
                    {error && <p className="auth-feedback-text auth-error-text">{error}</p>}
                </div>
            </div>
        );
    }
    
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Choose a New Password</h1>
                <p className="auth-text">Your new password must be secure and different from previous passwords.</p>
                
                <form onSubmit={handleResetPassword}>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="auth-input"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button type="button" className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <input
                        type="password" 
                        className="auth-input"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    
                    {error && <p className="auth-feedback-text auth-error-text" style={{margin: '0 0 1rem 0'}}>{error}</p>}

                    <button type="submit" className="auth-button" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save New Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
// Verification.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Verification = () => {
  const { token } = useParams(); // Extracts the token from the URL

  useEffect(() => {
    const verifyEmail = async () => {
      // Sends a request to the backend to verify the email with the provided token
      const response = await fetch(`https://loginserver-2s23nyu0.b4a.run/login/api/verify/${token}`);
      
      if (response.ok) {
        alert("Email verified successfully!");
      } else {
        alert("Failed to verify email. The link may be expired.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>Please wait while we verify your email...</p>
    </div>
  );
};

export default Verification;

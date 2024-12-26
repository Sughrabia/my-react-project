import React, { useState } from "react";
import "./css/LoginSignup.css";
import { Link } from "react-router-dom";


const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setEmailError("");
  
    try {
      const response = await fetch("http://localhost:5000/login/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        alert("OTP sent to your email. Please check and verify.");
        setIsOtpSent(true);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };
  
  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setOtpError("");

  
    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
  
      if (response.ok) {
        alert("OTP verified successfully.");
        setOtpVerified(true);
      } else {
        const data = await response.json();
        setOtpError(data.message || "Invalid OTP.");
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    }
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    if (!isValid || !otpVerified) {
      alert("Please complete all fields and verify your OTP.");
      return;
    }

    try {
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert(
          "Registered successfully! You can now log in with your credentials."
        );
        setName("");
        setEmail("");
        setPassword("");
        setOtp("");
        setIsOtpSent(false);
        setOtpVerified(false);
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="loginsignup-page">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        {!isOtpSent ? (
          <form onSubmit={handleSendOtp}>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="loginsignup-content"
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="new-email"
            />
            {emailError && <p className="errormessage">{emailError}</p>}
            <button type="submit">Send OTP</button>
          </form>
        ) : !otpVerified ? (
          <form onSubmit={handleVerifyOtp}>
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              className="loginsignup-content"
              type="text"
              placeholder="Enter OTP"
              name="otp"
            />
            {otpError && <p className="errormessage">{otpError}</p>}
            <button type="submit">Verify OTP</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="loginsignup-content"
              type="text"
              placeholder="Username"
              name="name"
              autoComplete="new-name"
            />
            {nameError && <p className="errormessage">{nameError}</p>}
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="loginsignup-content"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
            />
            {passwordError && <p className="errormessage">{passwordError}</p>}
            <button type="submit">Register</button>
          </form>
        )}
        <p>
          Already have an account?{" "}
          <Link style={{ textDecoration: "none" }} to="/login">
            <span>Login here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;

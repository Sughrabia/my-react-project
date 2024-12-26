import React, { useState } from "react";
import "./css/LoginSignup.css";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useNavigate } from "react-router-dom";
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
<<<<<<< HEAD
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

=======
  const [showOtpField, setShowOtpField] = useState(false);
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
<<<<<<< HEAD
=======
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

<<<<<<< HEAD
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setEmailError("");
  
    try {
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/api/send-otp", { // Updated URL
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
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/api/verify-otp", { // Updated URL
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
=======
  const handleSignup = async (event) => {
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8
    event.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setServerMessage("");
    
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

<<<<<<< HEAD
    if (!isValid || !otpVerified) {
      alert("Please complete all fields and verify your OTP.");
      return;
    }

    try {
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/api/signup", {
=======
    if (!isValid) return;

    try {
      // Send data to backend for sign-up
      const response = await fetch("http://localhost:5000/login/api/signup", {
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

<<<<<<< HEAD
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
=======
      const data = await response.json();

      if (response.ok) {
        setServerMessage("Signup successful! Please check your email for the OTP.");
        
        // Send OTP after successful signup
        const otpResponse = await fetch("http://localhost:5000/login/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Send only email for OTP
        });

        const otpData = await otpResponse.json();

        if (otpResponse.ok) {
          setShowOtpField(true); // Show OTP input field
          setServerMessage("OTP sent to your email.");
        } else {
          setServerMessage(`Error: ${otpData.message}`);
        }
      } else {
        setServerMessage(`Error: ${data.message}`);
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8
      }
    } catch (error) {
      setServerMessage("Server error. Please try again later.");
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setOtpError("");
    setServerMessage("");

    if (!otp) {
      setOtpError("OTP is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // Send email and OTP for verification
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 5000);
      } else {
        setServerMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setServerMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="loginsignup-page">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
<<<<<<< HEAD
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
=======
        {!showOtpField ? (
          <form onSubmit={handleSignup}>
            <div className="loginsignup-fields">
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="loginsignup-content"
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="new-email"
              />
              {emailError && <p className="errormessage">{emailError}</p>}
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
            </div>
            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerification}>
            <div className="loginsignup-fields">
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                className="loginsignup-content"
                type="text"
                placeholder="Enter OTP"
                name="otp"
                autoComplete="off"
              />
              {otpError && <p className="errormessage">{otpError}</p>}
            </div>
            <button type="submit">Verify OTP</button>
          </form>
        )}
        {serverMessage && <p className="server-message">{serverMessage}</p>}
        {!showOtpField && (
          <p>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              <span>Login here</span>
            </Link>
          </p>
        )}
>>>>>>> 46ee6c4552e20bf4bbe8f09eb7a94c2a834d0bc8
      </div>
    </div>
  );
};

export default LoginSignup;

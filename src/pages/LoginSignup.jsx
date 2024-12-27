import React, { useState } from "react";
import "./css/LoginSignup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSignup = async (event) => {
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

    if (!isValid) {
      alert("Please complete all fields.");
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

      const data = await response.json();

      if (response.ok) {
        setServerMessage("Signup successful! Please check your email for the OTP.");
        const otpResponse = await fetch("https://loginserver-2s23nyu0.b4a.run/login/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const otpData = await otpResponse.json();

        if (otpResponse.ok) {
          setShowOtpField(true);
          setServerMessage("OTP sent to your email.");
        } else {
          setServerMessage(`Error: ${otpData.message}`);
        }
      } else {
        setServerMessage(`Error: ${data.message}`);
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
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 5000);
      } else {
        setServerMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="loginsignup-page">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
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
      </div>
    </div>
  );
};

export default LoginSignup;

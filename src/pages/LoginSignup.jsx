import React, { useState } from "react";
import "./css/LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const startResendTimer = () => {
    setResendTimer(30); // 30-second timer
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setFormErrors({});
    setServerMessage("");

    let isValid = true;
    const errors = {};

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }
    if (!password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!validatePassword(password)) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setFormErrors(errors);

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/login/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage("Signup successful! Please check your email for the OTP.");
        startResendTimer();
        const otpResponse = await fetch("https://loginserver-2s23nyu0.b4a.run/login/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (otpResponse.ok) {
          setShowOtpField(true);
        } else {
          setServerMessage("Error sending OTP. Please try again.");
        }
      } else {
        setServerMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setServerMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (event) => {
    event.preventDefault();
    setFormErrors({});
    setServerMessage("");

    if (!otp) {
      setFormErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setServerMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setServerMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      setLoading(true);
      const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setServerMessage("OTP resent successfully.");
        startResendTimer();
      } else {
        setServerMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setServerMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
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
              />
              {formErrors.name && <p className="errormessage">{formErrors.name}</p>}
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="loginsignup-content"
                type="email"
                placeholder="Email"
                name="email"
              />
              {formErrors.email && <p className="errormessage">{formErrors.email}</p>}
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="loginsignup-content"
                type="password"
                placeholder="Password"
                name="password"
              />
              {formErrors.password && <p className="errormessage">{formErrors.password}</p>}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Sign Up"}
            </button>
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
              />
              {formErrors.otp && <p className="errormessage">{formErrors.otp}</p>}
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendTimer > 0 || loading}
            >
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
            </button>
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

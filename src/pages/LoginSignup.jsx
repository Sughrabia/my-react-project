import React, { useState } from 'react';
import "./css/LoginSignup.css";
import { Link } from 'react-router-dom';

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (event) => {
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
    if (!isValid) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(
          "Registered successfully! Please check your email to verify your account."
        );
        setName("");
        setEmail("");
        setPassword("");
      } else {
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
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Continue</button>
        </form>
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

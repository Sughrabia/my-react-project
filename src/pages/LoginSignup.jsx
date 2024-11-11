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
    const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      alert('Registered successful!');
      setName(""); 
      setEmail(""); 
      setPassword("");
    } else {
      alert(`Error: ${data.message}`);
    }
  };

  return (
    <div className='loginsignup-page'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='loginsignup-fields'>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className='loginsignup-content' 
              type="text" 
              placeholder='Username' 
              id="name-input" 
              name="name" 
              autoComplete="new-name" 
            />
            {nameError && <p className='errormessage'>{nameError}</p>}
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className='loginsignup-content' 
              type="email" 
              placeholder='Email' 
              id="email-input" 
              name="email" 
              autoComplete="new-email" 
            />
            {emailError && <p className='errormessage'>{emailError}</p>}
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='loginsignup-content' 
              type="password" 
              placeholder='Password' 
              id="password-input" 
              name="password" 
              autoComplete="new-password" 
            />
            {passwordError && <p className='errormessage'>{passwordError}</p>}
          </div>
          <button type="submit">Continue</button>
        </form>
        <p>already have an account? <Link style={{textDecoration:'none'}} to='/login'><span>login here</span></Link></p>
      </div>
    </div>
  );
}

export default LoginSignup;

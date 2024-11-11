import React, { useState } from 'react';
import "./css/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        setEmailError("");
        setPasswordError("");

        let isValid = true;

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
          const response = await fetch("https://loginserver-2s23nyu0.b4a.run/login/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
          });

          const data = await response.json();

          if (response.ok) {
            alert('Login successful!');
            setEmail(""); 
            setPassword("");
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          alert('Server error');
        }
    };

    return (
      <div className='loginsignup-page'>
        <div className='loginsignup-container'>
          <h1>Login Here</h1>
          <form onSubmit={handleSubmit}>
            <div className='loginsignup-fields'>
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
        </div>
      </div>
    )
}

export default Login;

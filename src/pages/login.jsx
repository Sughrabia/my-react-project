import React, { useState } from 'react';
import "./css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://loginserver-2s23nyu0.b4a.run/login/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        navigate("/login");
        setEmail("");
        setPassword("");
      } else if (data.message === "User not verified") {
        alert(
          "Your account is not verified. Please check your email for the verification link."
        );
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
        <h1>Login Here</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="loginsignup-content"
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="new-email"
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="loginsignup-content"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

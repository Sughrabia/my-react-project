import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthoContext";
import { Link, useNavigate } from "react-router-dom";
import "./css/LoginSignup.css";

const LoginSignup = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData.name, formData.email, formData.password);

      // Check if response is valid before accessing .message
      if (!response || !response.message) {
        throw new Error("Unexpected response from server");
      }
      alert(response.message);
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data) {
        alert(err.response.data.message);
      } else {
        alert(err.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="loginsignup-page">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <form className="loginsignup-fields" onSubmit={handleSubmit}>
          <input
            className="loginsignup-content"
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="loginsignup-content"
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            className="loginsignup-content"
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              <span>Login here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;

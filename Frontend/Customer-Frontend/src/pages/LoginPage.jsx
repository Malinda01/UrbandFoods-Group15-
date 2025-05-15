import React, { useState } from "react";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/FooterHome";
import { Eye, EyeOff } from "lucide-react";
import "../css/Form.css";
import axios from "axios"; // Axios for HTTP requests

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null); // To store user data

  const handleLogin = async (e) => {
    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("Login function triggered"); // Add this line to check
    };

    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/customers/login",
        {
          email,
          password,
        }
      );

      const customer = response.data;

      // Add this line to log the API response and inspect the returned object
      console.log("Login API Response:", customer);

      setProfile(customer); // Store in state

      // Save to localStorage (we'll fix this based on what you see in the console)
      localStorage.setItem("customerId", customer.CUSTOMER_ID);
      localStorage.setItem("customerName", customer.CUS_NAME);
      localStorage.setItem("customerPhone", customer.CUS_PHONE);
      localStorage.setItem("customerAddress", customer.CUS_ADDRESS);
      localStorage.setItem("customerEmail", customer.CUS_EMAIL);
      localStorage.setItem("customerPassword", customer.CUS_PASSWORD);

      // Optional: redirect to profile page
      window.location.href = "/profile-home"; // or use navigate("/profile") if using react-router

      setError("");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome Back!</h1>
          <p>Please login to your account</p>
        </div>
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-icon"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

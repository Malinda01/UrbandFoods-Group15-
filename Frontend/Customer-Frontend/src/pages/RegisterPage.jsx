import React, { useState } from "react";
import NavbarHome from "../components/NavbarHome";
import FooterHome from "../components/FooterHome";
import { Eye, EyeOff } from "lucide-react";
import "../css/FormR.css";
import axios from "axios";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/api/customers/add",
        formData
      );
      alert("Registration successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Error registering user. See console for details.");
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="hero-sectionR">
        <div className="form-container">
          <h2>Register</h2>
          <form
            onSubmit={async (e) => {
              await handleSubmit(e);
              window.location.href = "/login";
            }}
          >
            <label>Name</label>
            <input
              name="name"
              type="text"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <div className="password-wrapper">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-icon"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
        <div className="hero-contentR">
          <h1>Explore Urbanfood with Us!</h1>
          <p>Please sign-up your account</p>
        </div>
      </div>
      <FooterHome />
    </>
  );
};

export default RegisterPage;

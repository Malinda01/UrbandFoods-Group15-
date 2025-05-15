import React from "react";
import "../css/Footer.css";
import logo from "../assets/logo.png"; // Replace with your actual logo path

function Footer() {
  return (
    <footer className="footer-container">
      {/* Top Section - Four evenly spaced sections */}
      <div className="footer-top">
        {/* Left - Logo */}
        <div className="footer-left">
          <img src={logo} alt="UrbanFood Logo" className="footer-logo" />
        </div>

        {/* Center Left - Address */}
        <div className="footer-center">
          <p>One Galle Face Tower, Colombo</p>
          <p>Email: info@urbanfood.com</p>
          <p>Phone: +94 112 345 678</p>
        </div>

        {/* Center Right - Links */}
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
        </div>

        {/* Right - Login & Sign Up */}
        <div className="footer-right">
          <a href="/login" className="btn1 login-btn1">Login</a>
          <a href="/signup" className="btn1 signup-btn1">Sign Up</a>
        </div>
      </div>

      {/* Bottom Section - Copyright & Policies */}
      <div className="footer-bottom">
        <p>
          © 2023 UrbanFood. All rights reserved. Privacy Policy | Terms of
          Service
        </p>
      </div>
    </footer>
  );
}

export default Footer;

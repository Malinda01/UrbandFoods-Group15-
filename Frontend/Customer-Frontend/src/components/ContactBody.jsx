import React, { useState } from "react";
import axios from "axios";
import "../css/ContactBody.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again later.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-hero"></div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="hero-overlay">
            <h1>Contact Us</h1>
            <p>
              We’d love to hear from you! Reach out with any questions or
              feedback.
            </p>
          </div>
          <p>
            <b>Email:</b> support@urbanfood.com
          </p>
          <p>
            <b>Phone:</b> +94 112 345 678
          </p>
          <p>
            <b>Location:</b> One Galle Face Tower, Colombo
          </p>
          <p>
            <b>Business Hours:</b> Mon - Fri: 9AM - 5PM
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

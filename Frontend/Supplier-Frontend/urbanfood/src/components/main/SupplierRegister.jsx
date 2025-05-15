import React, { useState } from "react";
import axios from "axios";

const SupplierRegister = () => {
  const [formData, setFormData] = useState({
    supplierName: "",
    contactName: "",
    phoneNumber: "",
    address: "",
    email: "",
    pass: "",
    supplierType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Trim all inputs before sending
    const trimmedData = {
      supplierName: formData.supplierName.trim(),
      contactName: formData.contactName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      address: formData.address.trim(),
      email: formData.email.trim(),
      pass: formData.pass.trim(),
      supplierType: formData.supplierType.trim(),
    };

    // Validate phone number length (must not exceed 15 characters)
    if (trimmedData.phoneNumber.length > 15) {
      alert("Phone number cannot exceed 15 characters.");
      return;
    }

    try {
      console.log("Sending data:", trimmedData);
      await axios.post("http://localhost:8080/api/suppliers/add", trimmedData);
      console.log("Data sent successfully:", trimmedData);
      alert("Supplier added successfully!");

      setFormData({
        supplierName: "",
        contactName: "",
        phoneNumber: "",
        address: "",
        email: "",
        pass: "",
        supplierType: "",
      });
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier.");
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-light">
      <h2 className="text-center mb-4">Supplier Register</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="supplierName">Name:</label>
          <input
            type="text"
            name="supplierName"
            className="form-control"
            placeholder="Enter name"
            value={formData.supplierName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            className="form-control"
            placeholder="Enter phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Enter address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="pass"
            className="form-control"
            placeholder="Enter password"
            value={formData.pass}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="supplierType">Supplier Type:</label>
          <input
            type="text"
            name="supplierType"
            className="form-control"
            placeholder="Enter supplier type"
            value={formData.supplierType}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default SupplierRegister;

import React, { useState, useEffect } from "react";
import axios from "axios";

const SupplierProfile = () => {
  const [supplier, setSupplier] = useState({
    supplierId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    supplierType: "",
  });

  useEffect(() => {
    const fetchSupplierDetails = async () => {
      const supplierId = localStorage.getItem("supplierId");
      if (!supplierId) {
        alert("No supplier ID found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/suppliers/details/${supplierId}`
        );
        setSupplier({
          supplierId: response.data.supplierId,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          address: response.data.address,
          password: response.data.password,
          supplierType: response.data.supplierType,
        });
      } catch (error) {
        alert("Error fetching supplier details: " + error.message);
      }
    };

    fetchSupplierDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/api/suppliers/update",
        {
          supplierId: supplier.supplierId,
          supplierName: supplier.name,
          email: supplier.email,
          phoneNumber: supplier.phone,
          address: supplier.address,
          pass: supplier.password,
          supplierType: supplier.supplierType,
        }
      );
      alert(response.data);
    } catch (error) {
      alert(
        error.response?.data || "Error updating supplier. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-light">
      <h2 className="text-center mb-4">Supplier Profile</h2>

      <form onSubmit={handleUpdate}>
        <div className="form-group mb-3">
          <label htmlFor="supplierId">Supplier ID:</label>
          <input
            type="text"
            id="supplierId"
            name="supplierId"
            className="form-control"
            value={supplier.supplierId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={supplier.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={supplier.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={supplier.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={supplier.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={supplier.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="supplierType">Supplier Type:</label>
          <input
            type="text"
            id="supplierType"
            name="supplierType"
            className="form-control"
            value={supplier.supplierType}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update
        </button>
      </form>
    </div>
  );
};

export default SupplierProfile;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EditProfileForm.css";

const EditProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: localStorage.getItem("customerName") || "",
    email: localStorage.getItem("customerEmail") || "",
    address: localStorage.getItem("customerAddress") || "",
    phone: localStorage.getItem("customerPhone") || "",
    password: localStorage.getItem("customerPassword") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: localStorage.getItem("customerName") || "",
      email: localStorage.getItem("customerEmail") || "",
      address: localStorage.getItem("customerAddress") || "",
      phone: localStorage.getItem("customerPhone") || "",
      password: localStorage.getItem("customerPassword") || "",
    });
    setIsEditing(false);
  };

  /*const handleUpdate = async () => {
        const customerId = localStorage.getItem("customerId");
        try {
          const response = await fetch(`http://localhost:8080/api/customers/update/${customerId}`, {
            method: "PATCH", // must match backend
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // this matches CustomerUpdateRequest
          });
      
          if (response.ok) {
            alert("Profile updated successfully!");
            // update localStorage
            Object.entries(formData).forEach(([key, value]) => {
              localStorage.setItem(`customer${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
            });
            setIsEditing(false);
          } else {
            alert("Failed to update profile.");
          }
        } catch (err) {
          console.error(err);
          alert("Error updating profile.");
        }
      };*/

  const handleUpdate = async () => {
    const customerId = localStorage.getItem("customerId");
    try {
      const response = await fetch(
        `http://localhost:8081/api/customers/update/${customerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.text(); // read response message

      console.log("Server response:", result); // 👈 LOG HERE

      if (response.ok) {
        alert("Profile updated successfully!");
        Object.entries(formData).forEach(([key, value]) => {
          localStorage.setItem(
            `customer${key.charAt(0).toUpperCase() + key.slice(1)}`,
            value
          );
        });
        setIsEditing(false);
      } else {
        alert("Failed to update profile. " + result); // 👈 SHOW ERROR
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error updating profile.");
    }
  };

  return (
    <section className="edit-profile-section">
      <div className="edit-profile-form">
        <div className="form-wrapper">
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Phone:
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Address:
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          {!isEditing ? (
            <button onClick={handleEdit}>Edit</button>
          ) : (
            <>
              <div className="button-group">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default EditProfileForm;

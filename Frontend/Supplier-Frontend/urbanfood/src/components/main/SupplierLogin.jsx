import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SupplierLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/suppliers/login?email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: "", // Required to avoid Spring Boot rejecting the request
        }
      );

      const result = await response.text();

      if (response.ok && result) {
        localStorage.setItem("supplierId", result); // ✅ Save ID
        alert("Login successful!");
        navigate("/dashboard"); // No need to pass state anymore
      } else {
        setError(result || "Invalid email or password.");
      }
    } catch (err) {
      setError("Error during login: " + err.message);
    }
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow-sm bg-light">
      <h2 className="text-center mb-4">Supplier Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default SupplierLogin;

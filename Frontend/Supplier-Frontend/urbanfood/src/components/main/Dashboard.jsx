import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [supplierID, setSupplierID] = useState(null);

  useEffect(() => {
    // Get the Supplier ID from localStorage
    const id = JSON.parse(localStorage.getItem("supplierID"));
    if (id) {
      setSupplierID(id);
    } else {
      // If no ID is found, you can redirect the user to the login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="text-center">
      <h1>Welcome to the Home Page</h1>
      {supplierID && <p>Your Supplier ID is: {supplierID}</p>}{" "}
      {/* Display the ID */}
      <div className="mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

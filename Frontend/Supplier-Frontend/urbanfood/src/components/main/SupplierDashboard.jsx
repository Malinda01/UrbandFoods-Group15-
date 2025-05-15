import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SupplierDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const supplierId = location.state?.supplierId;

  const supplierId = localStorage.getItem("supplierId");

  // Optional: Redirect if supplier ID not present
  if (!supplierId) {
    navigate("/supplier-login");
    return null;
  }

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.removeItem("supplierId"); // Assuming you're saving the supplier ID in localStorage

    // Redirect to the login page
    navigate("/supplier-login");
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-success text-white p-4 rounded-start shadow-sm">
          <h4 className="fw-bold mb-4">Supplier Dashboard</h4>
          <ul className="nav flex-column">
            {/* Products */}
            <li className="nav-item mb-2">
              <Link className="nav-link text-white fw-bold" to="/products">
                <i className="bi bi-box-seam me-2"></i>Products
              </Link>
            </li>
            {/* Profile */}
            <li className="nav-item mb-2">
              <Link
                className="nav-link text-white fw-bold"
                to="/supplier-profile"
              >
                <i className="bi bi-person-circle me-2"></i>Profile
              </Link>
            </li>

            {/* High Demand Products */}
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/highdemand">
                <i className="bi bi-question-circle me-2"></i>High Demand
                Products
              </Link>
            </li>

            {/* Total Sales */}
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/sales">
                <i className="bi bi-question-circle me-2"></i>Sales
              </Link>
            </li>

            {/* Support */}
            <li className="nav-item">
              <Link className="nav-link text-white fw-bold" to="/support">
                <i className="bi bi-question-circle me-2"></i>Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-5 bg-light rounded-end shadow-sm">
          <h2 className="text-success fw-bold mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-muted">
            Here you can manage your products, update your profile, and access
            support.
          </p>
          <p className="text-muted">
            <strong>Supplier ID:</strong> {supplierId}
          </p>

          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title text-success fw-bold">
                    Manage Products
                  </h5>
                  <p className="card-text text-muted">
                    View, add, and update your products effortlessly.
                  </p>
                  <Link to="/products" className="btn btn-outline-success">
                    Go to Products
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title text-success fw-bold">
                    Update Profile
                  </h5>
                  <p className="card-text text-muted">
                    Keep your profile information up to date.
                  </p>
                  <Link
                    to="/supplier-profile"
                    className="btn btn-outline-success"
                  >
                    Go to Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center mt-5">
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="text-center mt-5">
            <p className="text-muted">
              Need help?{" "}
              <Link to="/support" className="text-success fw-bold">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;

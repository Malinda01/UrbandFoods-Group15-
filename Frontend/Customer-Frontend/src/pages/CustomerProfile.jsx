import React, { useState, useEffect } from "react";
import "../css/CustomerProfile.css";
import NavbarProfile from "../components/NavbarProfile";
import Footer from "../components/FooterHome";
import EditProfileForm from "../components/EditProfileForm";
import OrderHistory from "../components/OrderHistory";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";
import "../css/HistoryReview.css";

const CustomerProfile = () => {
  const [selectedSection, setSelectedSection] = useState("edit");
  const [profileName, setProfileName] = useState("Guest");

  useEffect(() => {
    const name = localStorage.getItem("customerName");
    if (name) {
      setProfileName(name);
    }
  }, []);

  const [selectedOrder, setSelectedOrder] = useState(null);

const renderSection = () => {
  switch (selectedSection) {
    case "edit":
      return <EditProfileForm />;
    case "orders":
      return <OrderHistory setSelectedSection={setSelectedSection} setSelectedOrder={setSelectedOrder} />;
    case "reviews":
      return <ReviewForm selectedOrder={selectedOrder} />;
    default:
      return null;
  }
};

  return (
    <>
      <NavbarProfile profileName={profileName} />
      <div className="profile-container">
      <div className="sidebar">
      <div
        className={`sidebar-item ${selectedSection === "edit" ? "active" : ""}`}
        onClick={() => setSelectedSection("edit")}
      >
        Edit Profile
      </div>
      <div
        className={`sidebar-item ${selectedSection === "orders" ? "active" : ""}`}
        onClick={() => setSelectedSection("orders")}
      >
        Order History
      </div>
      <div
        className={`sidebar-item ${selectedSection === "reviews" ? "active" : ""}`}
        onClick={() => setSelectedSection("reviews")}
      >
        Product Reviews
      </div>
      <div
        className="sidebar-item logout"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </div>
    </div>

        <div className="content">{renderSection()}</div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerProfile;

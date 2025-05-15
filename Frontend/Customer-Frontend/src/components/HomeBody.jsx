import React from "react";
import "../css/HomeBody.css"; // Ensure you import the CSS file
import homeImage from "../assets/logo.png"; // Replace with the actual image path

function HomeBody() {
  return (
    <div className="home-body-container">
      <div className="home-image">
        <img src={homeImage} alt="UrbanFood Shopping" />
      </div>
      <div className="home-text">
        <h1>
          Welcome to <span className="highlight">UrbanFood</span> – Your One-Stop Destination for Quality & Variety
        </h1>
        <p>
          UrbanFood is a next-generation e-commerce platform designed to bring you a seamless and diverse shopping experience. Whether you're looking for fresh groceries, gourmet delicacies, or daily essentials, we connect you with multiple trusted suppliers in a single, convenient marketplace.
        </p>

        
      </div>
    </div>
  );
}

export default HomeBody;

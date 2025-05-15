import React from "react";
import "../css/HomeBody1.css"; // Ensure you import the CSS file
import img1 from "../assets/homebody/bimg1.png";
import img2 from "../assets/homebody/bimg2.png";
import img3 from "../assets/homebody/bimg3.png";
import img4 from "../assets/homebody/bimg4.png";

function HomeBody() {
  return (
    <div className="home-body-container1">
      <div className="home-text">
        <h2>Why <span className="highlight">UrbanFood?</span></h2><br></br>
        

        <div className="features">
          <div className="feature">
            <img src={img1} alt="Multiple Suppliers" className="feature-image" />
            <h3>Multiple Suppliers, One Order</h3>
            <p>Shop from various sellers in a single checkout.</p>
          </div>

          <div className="feature">
            <img src={img2} alt="Fast Delivery" className="feature-image" />
            <h3>Fast & Reliable Delivery</h3>
            <p>Track your orders in real time with our smart logistics system.</p>
          </div>

          <div className="feature">
            <img src={img3} alt="Customer Reviews" className="feature-image" />
            <h3>Customer Reviews You Can Trust</h3>
            <p>Read genuine feedback stored securely in our database.</p>
          </div>

          <div className="feature">
            <img src={img4} alt="Personalized Shopping" className="feature-image" />
            <h3>Personalized Shopping Experience</h3>
            <p>Get tailored recommendations based on your preferences.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBody;

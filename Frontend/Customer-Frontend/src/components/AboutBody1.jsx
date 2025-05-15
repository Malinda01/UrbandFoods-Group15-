import React from "react";
import "../css/AboutBody.css";
import companyImage from "../assets/company.png"; // Use your actual image
import p1 from "../assets/team/p1.jpg";
import p2 from "../assets/team/p2.jpg";
import p3 from "../assets/team/p3.jpg";
import p4 from "../assets/team/p4.jpg";
import p5 from "../assets/team/p5.jpg";
import p6 from "../assets/team/p6.jpg";
import p7 from "../assets/team/p7.jpg";
import p8 from "../assets/team/p8.jpg";

const team = [
  { name: "Alice Johnson", role: "Project Manager", img: p1 },
  { name: "Brian Lee", role: "Frontend Developer", img: p2 },
  { name: "David Kim", role: "Backend Developer", img: p3 },
  { name: "Catherine Smith", role: "UI/UX Designer", img: p4 },
  { name: "Eva Brown", role: "QA Engineer", img: p5 },
  { name: "Frank Green", role: "DevOps Engineer", img: p6 },
  { name: "Grace White", role: "Product Owner", img: p7 },
  { name: "Henry Black", role: "Data Analyst", img: p8 },
];

const AboutBody1 = () => {
  return (
    <div className="about-main">
      {/* About the Company */}
      <div className="about-company-section">
        <div className="about-company-text">
          <p>
            UrbanFood is committed to revolutionizing how people shop for food.
            We bridge the gap between consumers and reliable food vendors with a
            seamless online experience. Our goal is to ensure quality,
            transparency, and convenience in every transaction.
          </p>
          <p>
            Our software backbone is powered by{" "}
            <strong>Miazel Technologies</strong>, a forward-thinking company
            dedicated to delivering cutting-edge software solutions. Miazel
            focuses on building scalable platforms that foster growth and
            balance within the food industry, ensuring UrbanFood remains at the
            forefront of innovation.
          </p>
        </div>
        <div className="about-company-image">
          <img src={companyImage} alt="About UrbanFood" />
        </div>
      </div>

      <div>
        {/* Our Mission */}
        <div className="mission-section center-text">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
            At UrbanFood, we connect customers with high-quality food products from trusted suppliers. 
            Our platform makes online food shopping simple, secure, and satisfying.
            </p>
          </div>
          <div className="mission-content">
            <h2>Our Vision</h2>
            <p>
            We envision a future where every household enjoys fresh, affordable, and responsibly sourced food at the click of a button. 
            UrbanFood aims to be the leading platform that bridges communities with a world of delicious possibilities.
            </p>
          </div>
          <div className="mission-content">
            <h2>Our Values</h2>
            <p>
            At UrbanFood, we believe in trust, transparency, and taste. We are committed to 
            empowering local suppliers, ensuring product quality, and creating an 
            exceptional shopping experience for every customer.
            </p>
          </div>
        </div>

        {/* Meet the Team */}
        <div className="team-section">
          <h2>Meet the Team</h2>
          <div className="team-members">
            {team.map((member, index) => (
              <div className="team-card" key={index}>
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutBody1;

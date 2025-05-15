import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/FooterHome";
import AboutBody from "../components/AboutBody"; // Assuming you have an AboutBody component
import AboutBody1 from "../components/AboutBody1";

function AboutUs() {
  return (
    <>
      <div>
        <NavbarHome />
      </div>

      <div>
        <AboutBody />
      </div>
      <div>
        <AboutBody1 />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;

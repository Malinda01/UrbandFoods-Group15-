import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarHome from "../components/NavbarHome";
import Footer from "../components/FooterHome";
import ContactBody from "../components/ContactBody"; // Assuming you have a ContactBody component

function ContactUs() {
  return (
    <>
      <div>
        <NavbarHome />
      </div>

      <div>
        <ContactBody />
      </div>
      <div></div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ContactUs;

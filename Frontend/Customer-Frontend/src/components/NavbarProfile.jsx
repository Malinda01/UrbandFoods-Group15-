import React from "react";
import { Navbar, Nav, NavDropdown, Container, Image } from "react-bootstrap";
import "../css/NavbarHome.css";
import logo from "../assets/logonav.png";
import profileIcon from "../assets/profile-icon.png"; // Add a profile icon to assets

const NavbarProfile = ({ profileName = "Kasun" }) => {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned nav */}
          <Nav className="navbar-nav">
            <Nav.Link href="/profile-home">Home</Nav.Link>
            
          </Nav>

          {/* Right-aligned profile section */}
          <Nav className="ms-auto d-flex align-items-center">
            <span style={{ color: "#104a27", fontWeight: "bold", marginRight: "10px" }}>
              {profileName}
            </span>
            <a href="/customer-profile">
              <Image src={profileIcon} roundedCircle width="35" height="35" style={{ cursor: "pointer" }} />
            </a>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarProfile;

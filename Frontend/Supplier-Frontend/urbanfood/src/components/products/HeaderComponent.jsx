import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const HeaderComponent = () => {
  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-4">
      <Navbar.Brand href="/">UrbanFood Supplier</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/add-product">Add Product</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderComponent; // Ensure this is present

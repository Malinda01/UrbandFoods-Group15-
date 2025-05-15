import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../css/NavbarHome.css';
import logo from '../assets/logonav.png'; // Ensure correct logo path

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        {/* Left-aligned Brand Logo */}
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned Navigation Tabs with extra spacing */}
          <Nav className="navbar-nav">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>

          {/* Right-aligned Login Button */}
          <Nav className="nav-right">
            <Button href="/login" className="login-btn">Login</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;

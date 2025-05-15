import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./Home.css"; // Import custom CSS for additional styling

export default function Home() {
  return (
    <>
      <div className="content-wrapper background-image">
        {" "}
        {/* Add background-image class */}
        <Container
          className="mt-5 text-center"
          style={{ backgroundColor: "#FDFBD4" }}
        >
          {" "}
          {/* Add text-center to center-align content */}
          <Row className="mb-4">
            <Col>
              <h1 className="welcome-title">Welcome to the Urban Food</h1>
              <p className="welcome-subtitle">
                Your one-stop solution for managing deliveries efficiently.
              </p>
              <Button
                variant="success"
                href="/login"
                className="me-2 btn-custom"
              >
                Login
              </Button>
              <Button
                variant="secondary"
                href="/register"
                className="me-2 btn-custom"
              >
                Register
              </Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={4}>
              <Card className="mb-3 shadow-sm card-custom text-center">
                {" "}
                {/* Add text-center */}
                <Card.Body>
                  <Card.Title className="card-title-custom">
                    Track Deliveries
                  </Card.Title>
                  <Card.Text>
                    Stay updated with real-time tracking of your deliveries.
                  </Card.Text>
                  <Button variant="primary" className="btn-custom">
                    Learn More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 shadow-sm card-custom text-center">
                {" "}
                {/* Add text-center */}
                <Card.Body>
                  <Card.Title className="card-title-custom">
                    Manage Profiles
                  </Card.Title>
                  <Card.Text>
                    Update and manage your profile information with ease.
                  </Card.Text>
                  <Button variant="primary" className="btn-custom">
                    Get Started
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 shadow-sm card-custom text-center">
                {" "}
                {/* Add text-center */}
                <Card.Body>
                  <Card.Title className="card-title-custom">
                    Delivery Insights
                  </Card.Title>
                  <Card.Text>
                    Gain insights into your delivery performance and statistics.
                  </Card.Text>
                  <Button variant="primary" className="btn-custom">
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer-custom">
        <Container>
          <Row>
            <Col>
              <p className="mb-0">
                &copy; 2023 Delivery App. All rights reserved.
              </p>
            </Col>
            <Col>
              <Button
                variant="link"
                href="/profile"
                className="text-decoration-none text-primary footer-link"
              >
                Profile
              </Button>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

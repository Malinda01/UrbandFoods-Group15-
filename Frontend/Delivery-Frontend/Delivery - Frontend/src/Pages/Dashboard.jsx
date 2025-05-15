import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Container className="d-flex justify-content-center align-items-center vh-100 text-center">
        <Row>
          <Col>
            <h1>Dashboard</h1>
            <p>Welcome to your personalized dashboard. Manage your deliveries and insights here.</p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col md={4}>
            <Card className="dashboard-card mb-3">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Profile Management</Card.Title>
                <Card.Text className="dashboard-card-text">
                  Update and manage your profile information with ease.
                </Card.Text>
                <Button variant="info" href="/profile" className="me-2">
                  Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="dashboard-card mb-3">
              <Card.Body>
                <Card.Title className="dashboard-card-title">Delivery Management</Card.Title>
                <Card.Text className="dashboard-card-text">
                  View and manage your ongoing deliveries in real-time.
                </Card.Text>
                <Button variant="success" href="/delivery">
                  Delivery
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

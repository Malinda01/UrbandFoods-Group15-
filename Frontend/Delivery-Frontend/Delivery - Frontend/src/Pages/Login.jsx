import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container } from "react-bootstrap";
import axios from "axios";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8082/api/Dpersons/login",
        null,
        {
          params: { email, password },
        }
      );
      localStorage.setItem("D_Person_id", response.data);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div className="login-container">
        <Form
          onSubmit={handleLogin}
          className="w-100 shadow-lg p-5 rounded"
          style={{ backgroundColor: "#ffffff" }}
        >
          <h2 className="text-center mb-4 text-primary fw-bold">Login</h2>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bold">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border-primary"
              style={{ borderRadius: "5px" }}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border-primary"
              style={{ borderRadius: "5px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRememberMe">
            <Form.Check
              type="checkbox"
              label="Remember Me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="text-secondary"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 fw-bold mb-3"
            style={{ borderRadius: "5px" }}
          >
            Login
          </Button>
          <div className="text-center">
            <p className="mb-1">
              <a
                href="/forgot-password"
                className="text-decoration-none text-primary fw-bold"
              >
                Forgot Password?
              </a>
            </p>
            <p>
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-decoration-none text-primary fw-bold"
              >
                Register here
              </a>
            </p>
          </div>
        </Form>
      </div>
    </Container>
  );
}

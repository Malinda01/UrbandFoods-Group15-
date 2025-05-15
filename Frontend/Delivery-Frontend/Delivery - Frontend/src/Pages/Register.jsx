import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    company_name: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8082/api/Dpersons/add", formData);
      alert("Registered successfully!");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Form
        onSubmit={handleRegister}
        className="w-1000 shadow-lg p-5 rounded bg-white"
      >
        <h2 className="text-center mb-4 text-primary">Register</h2>
        {["name", "email", "address", "company_name", "password"].map(
          (field) => (
            <Form.Group className="mb-3" key={field}>
              <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
              <Form.Control
                type={field === "password" ? "password" : "text"}
                name={field}
                required
                onChange={handleChange}
              />
            </Form.Group>
          )
        )}
        <Button variant="success" type="submit" className="w-100 py-2 fw-bold">
          Register
        </Button>
      </Form>
    </Container>
  );
}

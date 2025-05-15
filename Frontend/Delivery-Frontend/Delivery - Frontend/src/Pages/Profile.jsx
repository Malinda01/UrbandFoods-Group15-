import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import "./profile.css";

export default function Profile() {
  const [details, setDetails] = useState({});
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const id = localStorage.getItem("D_Person_id");

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/Dpersons/details/${id}`)
      .then((res) => setDetails(res.data))
      .catch((err) => alert("Error fetching profile"));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8082/api/Dpersons/update/${id}`, details)
      .then(() => {
        alert("Profile updated successfully");
        setIsEditing(false); // Exit editing mode
      })
      .catch(() => alert("Error updating profile"));
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8082/api/Dpersons/delete/${id}`)
      .then(() => {
        alert("Profile deleted successfully");
        localStorage.removeItem("D_Person_id"); // Clear stored ID
        window.location.href = "/"; // Redirect to home page
      })
      .catch(() => alert("Error deleting profile"));
  };

  return (
    <Container className="mt-4">
      <h2>Profile</h2>
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="mb-3">
          <strong>{key}:</strong>
          {isEditing ? (
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleInputChange}
              className="form-control"
            />
          ) : (
            <span> {value}</span>
          )}
        </div>
      ))}
      {isEditing ? (
        <Button variant="success" onClick={handleUpdate} className="me-2">
          Save
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => setIsEditing(true)}
          className="me-2"
        >
          Edit
        </Button>
      )}
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Container>
  );
}

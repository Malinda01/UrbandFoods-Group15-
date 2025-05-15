import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";

export default function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/delivery/all")
      .then((response) => setDeliveries(response.data))
      .catch(() => alert("Error fetching delivery details"));
  }, []);

  const handleStatusChange = (orderId) => {
    axios
      .put(`http://localhost:8082/api/delivery/update/${orderId}`, {
        newStatus: "Completed",
      })

      .then(() => {
        setDeliveries((prevDeliveries) =>
          prevDeliveries.map((delivery) =>
            delivery.deliveryId === deliveryId
              ? { ...delivery, deliveryStatus: "Completed" }
              : delivery
          )
        );
        alert("Delivery status updated to Completed");
      })
      .catch(() => alert("Error updating delivery status"));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-75">
        <h2 className="text-center mb-4">Delivery Details</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Delivery ID</th>
              <th>Order ID</th>
              <th>Delivery Status</th>
              <th>Delivery Person</th>
              <th>Order Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={delivery.deliveryId}>
                <td>{index + 1}</td>
                <td>{delivery.deliveryId}</td>
                <td>{delivery.orderId}</td>
                <td>
                  {delivery.deliveryStatus === "Pending" ? (
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleStatusChange(delivery.orderId)}
                    >
                      Pending
                    </Button>
                  ) : (
                    <span className="text-success fw-bold">Completed</span>
                  )}
                </td>
                <td>{delivery.deliveryPerson}</td>
                <td>{delivery.orderDate}</td>
                <td>{delivery.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center mt-4">
          <Button variant="primary" href="/dashboard">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Container>
  );
}

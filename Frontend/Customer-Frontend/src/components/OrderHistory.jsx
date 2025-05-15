import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/HistoryReview.css";

const OrderHistory = ({ setSelectedSection, setSelectedOrder }) => {
  const [orders, setOrders] = useState([]);
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.post(
        "http://localhost:8081/api/customers/cart/latest",
        { customerId }
      );
      setOrders(response.data);
    };
    fetchOrders();
  }, [customerId]);

  const handleReviewClick = (orderId) => {
    setSelectedOrder(orderId);
    setSelectedSection("reviews");
  };

  return (
    <div className="order-history">
      {orders.map((order) => (
        <div key={order.ORDER_ID} className="order-card">
          <h3>Order ID: {order.ORDER_ID}</h3>
          <p>Date: {new Date(order.ORDER_DATE).toLocaleString()}</p>
          <p>Total: Rs.{order.TOTAL_AMOUNT.toFixed(2)}</p>
          <button
            className="order-card"
            onClick={() => handleReviewClick(order.ORDER_ID)}
          >
            Review
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

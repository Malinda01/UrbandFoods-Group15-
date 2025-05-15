import React, { useState } from "react";
import axios from "axios";

const Sales = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalSales, setTotalSales] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const supplierId = localStorage.getItem("supplierId");
    if (!supplierId || !startDate || !endDate) {
      setError("Please enter valid dates and ensure supplier is logged in.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/products/sales", {
        params: {
          supplierId,
          startDate,
          endDate,
        },
      });
      setTotalSales(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching sales data:", err);
      setError("Failed to fetch sales data. Please try again.");
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setTotalSales(null);
    setError("");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: "20px",
      height: "100vh",
      backgroundColor: "#f9f9f9",
    },
    box: {
      width: "100%",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#fff",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    label: {
      display: "block",
      marginBottom: "10px",
      fontWeight: "bold",
    },
    input: {
      display: "block",
      width: "100%",
      padding: "8px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    clearButton: {
      padding: "10px 20px",
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    result: {
      marginTop: "20px",
      fontWeight: "bold",
      color: "#28a745",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <label style={styles.label}>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={styles.input}
          />
        </label>
        <div style={styles.buttonContainer}>
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
          <button onClick={handleClear} style={styles.clearButton}>
            Clear
          </button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        {totalSales !== null && (
          <div style={styles.result}>Total Sales: ${totalSales.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default Sales;

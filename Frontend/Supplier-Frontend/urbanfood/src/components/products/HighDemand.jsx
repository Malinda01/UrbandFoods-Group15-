import React, { useEffect, useState } from "react";
import axios from "axios";

const HighDemand = () => {
  const [highDemandProducts, setHighDemandProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supplierId = localStorage.getItem("supplierId");

    if (!supplierId) {
      setError("Supplier ID is not available in local storage.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/products/high-demand/${supplierId}`)
      .then((response) => {
        console.log(response.data); // Log the response to check its structure
        setHighDemandProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch high demand products.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h1>High Demand Products</h1>
        </div>
        <div className="card-body">
          {highDemandProducts.length === 0 ? (
            <p className="text-muted">No products in high demand.</p>
          ) : (
            <ul className="list-group">
              {highDemandProducts.map((product) => (
                <li key={product.productId} className="list-group-item">
                  <p>
                    <strong>Product ID:</strong> {product.productId}
                  </p>
                  <p>
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Total Quantity Sold:</strong>{" "}
                    {product.totalQuantity}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighDemand;

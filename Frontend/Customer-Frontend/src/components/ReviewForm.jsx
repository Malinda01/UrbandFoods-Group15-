import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewForm = ({ selectedOrder }) => {
  const [products, setProducts] = useState([]);
  const [ratings, setRatings] = useState({});
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchOrderProducts = async () => {
      const response = await axios.post(
        "http://localhost:8081/api/customers/cart/products",
        { orderId: selectedOrder }
      );
      setProducts(response.data);
    };
    fetchOrderProducts();
  }, [selectedOrder]);

  const handleRatingChange = (productId, rating) => {
    setRatings((prev) => ({ ...prev, [productId]: rating }));
  };

  const handleSubmit = async (productId) => {
    const reviewData = [
      {
        customerId,
        orderId: selectedOrder,
        productId,
        rating: ratings[productId],
      },
    ];

    await axios.post("http://localhost:8081/api/reviews/submit", reviewData);
    alert(`✅ Review submitted for Product ID: ${productId}`);
  };

  return (
    <div className="review-form">
      <h2>Review for Order {selectedOrder}</h2>
      {products.length === 0 ? (
        <p>No products found for this order.</p>
      ) : (
        products.map((product) => (
          <div key={product.PRODUCT_ID} className="product-review-card">
            <p>
              <strong>{product.PRODUCT_NAME}</strong>
            </p>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRatingChange(product.PRODUCT_ID, star)}
                className={
                  ratings[product.PRODUCT_ID] >= star ? "star selected" : "star"
                }
              >
                ★
              </button>
            ))}
            <br />
            <button onClick={() => handleSubmit(product.PRODUCT_ID)}>
              Submit Review
            </button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewForm;

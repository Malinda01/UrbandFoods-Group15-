import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProductContainer.css";

const ProductContainer = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Failed to load products", error));
  }, []);

  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.productId}>
          <img src={product.imgUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Rs. {product.price}</p>
          <button onClick={() => onAddToCart(product)}>+</button>
        </div>
      ))}
    </div>
  );
};

export default ProductContainer;

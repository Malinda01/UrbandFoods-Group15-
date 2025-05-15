import React from "react";
import "../css/Cart.css";

const Cart = ({ cartItems, onAdd, onRemove, onPayNow, onClear, onDelete }) => {
  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getDiscount = () => {
    return getTotal() * 0.1;
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.productId} className="cart-item">
            <div className="details">
              <h4>{item.name}</h4>
              <p>
                Rs.{item.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
            <div className="cart-actions">
              <button onClick={() => onRemove(item.productId)}>-</button>
              <button onClick={() => onAdd(item)}>+</button>
              <button onClick={() => onDelete(item.productId)}>🗑️</button>
            </div>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <hr />
          <div style={{ marginTop: "10px", fontSize: "24px" }}>
            <p>
              <strong>Subtotal:</strong> Rs.{getTotal().toFixed(2)}
            </p>
          
          </div>
          <div className="button-group">
            <button className="checkout-btn" onClick={onPayNow}>
              Pay Now
            </button><br></br>
            <button className="clear-btn" onClick={onClear}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

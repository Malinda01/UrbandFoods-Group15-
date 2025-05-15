import React, { useState, useEffect } from "react";
import NavbarProfile from "../components/NavbarProfile";
import Footer from "../components/FooterHome";
import ProductContainer from "../components/ProductContainer";
import Cart from "../components/Cart";
import "../css/ProfileHomePage.css";
import axios from "axios";
import logo from "../assets/logonav.png";

function ProfileHomePage() {
  const [cart, setCart] = useState([]);
  const [profileName, setProfileName] = useState("Guest");
  const [orderId, setOrderId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedCart, setConfirmedCart] = useState([]);

  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const name = localStorage.getItem("customerName");
    if (name) {
      setProfileName(name);
    }
  }, []);

  const handleAddToCart = async (product) => {
    const customerId = localStorage.getItem("customerId"); // ✅ Get customerId from localStorage

    try {
      await axios.post("http://localhost:8081/api/customers/cart/add", {
        // 🔄 Match your backend controller endpoint
        customerId,
        productId: product.productId,
        price: product.price,
        quantity: 1,
      });

      // 🛒 Update local cart state in frontend
      setCart((prev) => {
        const existing = prev.find(
          (item) => item.productId === product.productId
        );
        if (existing) {
          return prev.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      await axios.post("http://localhost:8081/api/customers/cart/delete", {
        customerId,
        productId,
      });

      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.post("http://localhost:8081/api/customers/cart/clear", {
        customerId,
      });
      setCart([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.post("http://localhost:8081/api/customers/cart/remove", {
        customerId,
        productId,
      });

      setCart((prev) =>
        prev
          .map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const handlePayNow = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/customers/cart/pay",
        {
          customerId,
        }
      );
      console.log("🔄 Response from backend:", response.data);

      setOrderId(response.data.orderId);
      setConfirmedCart([...cart]); // 👈 this is what was missing
      setShowConfirmation(true);
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  const handleProceedToPayment = async () => {
    try {
      // Store the result of the API call in a response variable.
      const response = await axios.post(
        "http://localhost:8081/api/customers/cart/confirm",
        {
          customerId,
          orderId,
        }
      );
      console.log(" Order ID received:", response.data.orderId);
      alert(" Order confirmed! Payment done.");
      setShowConfirmation(false);
      setCart([]);
    } catch (error) {
      console.error("Failed to confirm order", error);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await axios.post("http://localhost:8081/api/customers/cart/cancel", {
        orderId,
      });
      alert("❌ Order canceled.");
      setShowConfirmation(false);
      setCart([]);
    } catch (error) {
      console.error("Failed to cancel", error);
    }
  };

  return (
    <>
      <NavbarProfile profileName={profileName} />

      <div className="profile-page-container">
        <div className="left-column">
          <ProductContainer onAddToCart={handleAddToCart} />
        </div>
        <div className="right-column">
          <Cart
            cartItems={cart}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
            onDelete={handleDeleteItem}
            onClear={handleClearCart}
            onPayNow={handlePayNow}
          />
        </div>
      </div>

      {/*showConfirmation && (
        <div className="confirmation-popup">
          <h3>Order Summary 🧾 </h3>
          <h3>Order ID: {orderId}</h3>

          {confirmedCart.map((item) => (
            <div key={item.productId}>
              <p>
                {item.name} - {item.quantity} × Rs.{item.price} = Rs.
                {item.price * item.quantity}
              </p>
            </div>
          ))}

          <p>
            <strong>Total:</strong> Rs.
            {confirmedCart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          </p>

          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
          <button onClick={handleCancelOrder}>Cancel</button>
        </div>
      )*/}

      {showConfirmation && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="confirmation-popup"
            style={{
              maxWidth: "500px",
              padding: "20px",
              border: "2px solid #ccc",
              borderRadius: "10px",
              backgroundColor: "#fefefe",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              fontFamily: "'Courier New', Courier, monospace",
              width: "90%",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img src={logo} alt="UrbanFood Logo" style={{ height: "60px" }} />
              <h2>UrbanFood e-Bill 🧾</h2>
            </div>

            <div
              style={{
                borderBottom: "1px dashed #aaa",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ fontSize: "18px" }}>Order ID: {orderId}</h3>
            </div>

            <div style={{ textAlign: "left", marginBottom: "20px" }}>
              {confirmedCart.map((item) => (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span>
                    {item.name} ({item.quantity} × Rs.{item.price})
                  </span>
                  <span>Rs.{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px dashed #aaa",
                marginTop: "20px",
                paddingTop: "10px",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Total:</span>
                <span>
                  Rs.
                  {confirmedCart.reduce(
                    (sum, i) => sum + i.price * i.quantity,
                    0
                  )}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                onClick={handleProceedToPayment}
                style={{
                  flex: 1,
                  marginRight: "10px",
                  padding: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Proceed to Payment
              </button>

              <button
                onClick={handleCancelOrder}
                style={{
                  flex: 1,
                  marginLeft: "10px",
                  padding: "10px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProfileHomePage;

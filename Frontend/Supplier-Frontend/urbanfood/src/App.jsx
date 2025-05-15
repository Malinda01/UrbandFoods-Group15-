import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import HeaderComponent from "./components/products/HeaderComponent";
import FooterComponent from "./components/products/FooterComponent";
import DisplayProducts from "./components/products/DisplayProducts";
import AddProduct from "./components/products/AddProduct";
import Home from "./components/main/Home";
import SupplierLogin from "./components/main/SupplierLogin";
import SupplierRegister from "./components/main/SupplierRegister";
import SupplierDashboard from "./components/main/SupplierDashboard";
import SupplierProfile from "./components/main/SupplierProfile";
import UpdateProduct from "./components/products/UpdateProduct";
import Sales from "./components/products/Sales";
import HighDemand from "./components/products/HighDemand";

import "./App.css"; // Import the CSS file for global styles

const App = () => {
  return (
    <Router>
      <div className="app-background">
        <div className="d-flex flex-column min-vh-100">
          <HeaderComponent />
          <Container className="my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<DisplayProducts />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
              <Route path="/supplier-login" element={<SupplierLogin />} />
              <Route path="/supplier-register" element={<SupplierRegister />} />
              <Route path="/dashboard" element={<SupplierDashboard />} />
              <Route path="/supplier-profile" element={<SupplierProfile />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/highdemand" element={<HighDemand />} />
            </Routes>
          </Container>
          <FooterComponent />
        </div>
      </div>
    </Router>
  );
};

export default App;

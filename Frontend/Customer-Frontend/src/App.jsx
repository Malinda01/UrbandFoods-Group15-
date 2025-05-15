import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import ProfileHomePage from "./pages/ProfileHomePage"; // Import the new page
import CustomerProfile from "./pages/CustomerProfile";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/profile-home" element={<ProfileHomePage />} />
          {/* Add this route */}
          <Route path="/customer-profile" element={<CustomerProfile />} />{" "}
          {/* Add a new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

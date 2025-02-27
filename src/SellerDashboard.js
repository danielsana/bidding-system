import React from "react";
import { useNavigate } from "react-router-dom";
import "./SellerDashboard.css"; // Optional: Add styles for the dashboard

const SellerDashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      <p>Welcome, Seller!</p>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/addproduct")}>Add Product</button>
        <button onClick={() => navigate("/view-products")}>
          View Products
        </button>
        <button onClick={() => navigate("/view-bids")}>View Bids</button>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default SellerDashboard;

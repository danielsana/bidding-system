import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Optional: Add styles for the dashboard

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/manage-users")}>Manage Users</button>
        <button onClick={() => navigate("/view-statistics")}>
          View Statistics
        </button>
        <button onClick={() => navigate("/manage-products")}>
          Manage Products
        </button>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;

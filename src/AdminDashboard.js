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
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <div className="dashboard-actions">
        <button onClick={() => navigate("/manage-users")}>View Users</button>
        <button onClick={() => navigate("/manage-sellers")}>
          View Sellers
        </button>
        <button onClick={() => navigate("/admin-manage-products")}>
          Manage Bidding
        </button>
        <button onClick={() => navigate("/manage-orders")}>
          Veiw Orders
        </button>
        
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;

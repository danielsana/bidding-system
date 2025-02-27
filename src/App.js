import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BiddingSystem from "./BiddingSystem";
import Login from "./Login";
import Signup from "./Signup"; // Import the Signup component
import AdminDashboard from "./AdminDashboard";
import SellerDashboard from "./SellerDashboard";
import AddProductPage from "./AddProduct";
import "./BiddingSystem.css";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("isAuthenticated") ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/addproduct" element={<AddProductPage />} />{" "}
        {/* Add the /signup route */}
        <Route
          path="/bidding"
          element={
            <PrivateRoute>
              <BiddingSystem />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

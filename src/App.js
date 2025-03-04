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
import UserTable from "./userTable";
import "./BiddingSystem.css";
import AddSeller from "./ViewSellers";
import AdminProductManagement from "./AdminProductManagement";
import AdminConfirmedOrders from "./AdminConfirmedOrders";
import BiddingPage from "./BiddingPage";
import SignupSeller from "./SignupSeller";
import BiddingAction from "./BiddingAction";
import ViewSellers from "./ViewSellers";


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
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/manage-users" element={<UserTable />} />
        <Route path="/manage-sellers" element={<ViewSellers />} />
        <Route path="/item/:id" element={<BiddingPage />} />
        <Route
          path="admin-manage-products"
          element={<AdminProductManagement />}
        />
        <Route path="manage-orders" element={<AdminConfirmedOrders />} />
        <Route path="bidding-page" element={<BiddingPage />} />
        <Route path="signupseller" element={<SignupSeller />} />
        <Route path="biddingaction" element={<BiddingAction />} />
        {" "}
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

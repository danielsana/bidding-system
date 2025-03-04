import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminConfirmedOrders.css";

const AdminConfirmedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInactiveBids();
  }, []);

  const fetchInactiveBids = async () => {
    try {
      console.log("Fetching inactive bids...");
      const response = await axios.get("http://127.0.0.1:5000/bids/inactive");
      console.log("API Response:", response.data);

      const bids = response.data.inactive_bids || [];
      console.log("Bids Data:", bids);
      if (!bids.length) {
        console.warn("No bids found.");
        setOrders([]);
        setLoading(false);
        return;
      }


      // const enrichedOrders = await Promise.all(
      //   bids.map(async (bid, index) => {
      //     try {
      //       console.log(`Fetching bids for item_id: ${bid.item_id}`);
      //       const bidResponse = await axios.get(
      //         `http://127.0.0.1:5000/fetch-bids/${bid.item_id}`
      //       );
      //       const bidDetails = bidResponse.data;
      //       console.log("Bid Details:", bidDetails);
      //       // if (!bidDetails.length) {
      //       //   console.warn(`No bids found for item_id: ${bid.item_id}`);
      //       //   return null;
      //       // }

      //       const firstBid = bidDetails[0];
      //       console.log(`Fetching user details for user_id: ${firstBid[4]}`);
      //       const userResponse = await axios.get(
      //         `http://127.0.0.1:5000/user/${firstBid[4]}`
      //       );
      //       const userData = userResponse.data;

      //       return {
      //         serial: index + 1,
      //         id: bid.id,
      //         item: bid.item_name || "Unknown Item",
      //         highestBid: bid.highest_bid || 0,
      //         bidder: userData.user_details.username || "Unknown User",
      //         paymentStatus:
      //           bid.status === "Inactive" ? "Paid - Sold Out" : "Not Paid",
      //       };
      //     } catch (error) {
      //       console.error("Error fetching bid or user details", error);
      //       return null;
      //     }
      //   })
      // );
const enrichedOrders = await Promise.all(
  bids.map(async (bid, index) => {
    try {
      console.log(`Fetching bids for item_id: ${bid.item_id}`);
      const bidResponse = await axios.get(
        `http://127.0.0.1:5000/fetch-bids/${bid.item_id}`
      );
      const bidDetails = bidResponse.data;
      console.log("Bid Details:", bidDetails);

      if (!bidDetails || !bidDetails.length) {
        console.warn(`No bids found for item_id: ${bid.item_id}`);
        return null;
      }

      const firstBid = bidDetails[0];
      console.log("First Bid:", firstBid);

      // Ensure firstBid[4] is the correct index for user_id
      const userId = firstBid[4];
      if (!userId) {
        console.warn(`Invalid user_id for item_id: ${firstBid[3]}`);
        return null;
      }

      console.log(`Fetching user details for user_id: ${userId}`);
      const userResponse = await axios.get(
        `http://127.0.0.1:5000/user/${userId}`
      );
      const userData = userResponse.data;
      console.log("User Data:", userData);

      return {
        ID: firstBid[1],
        id: firstBid[1],
        item: firstBid[2] || "Unknown Item",
        highestBid: firstBid[5] || 0,
        bidder: userData.user_details.username || "Unknown User",
        paymentStatus:
          bid.status === "Inactive" ? "Paid - Sold Out" : "Paid",
      };
    } catch (error) {
      console.error("Error fetching bid or user details", error);
      return null;
    }
  })
);

console.log("Enriched Orders:", enrichedOrders);
setOrders(enrichedOrders.filter((order) => order !== null));
      console.log("Final Orders Data:", enrichedOrders);
      setOrders(enrichedOrders.filter((order) => order !== null));
    } catch (error) {
      console.error("Error fetching inactive bids", error);
      setError("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orders.length) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="admin-confirmed-orders">
      <h1>Admin Confirmed Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Bidder's Name</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ID}</td>
              <td>{order.item}</td>
              <td>${order.highestBid}</td>
              <td>{order.bidder}</td>
              <td>
                <span
                  className={`payment-status ${
                    order.paymentStatus === "Paid - Sold Out"
                      ? "paid"
                      : "not-paid"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminConfirmedOrders;

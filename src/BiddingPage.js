import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./BiddingPage.css";

const BiddingPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState([]);
  const [isBiddingActive, setIsBiddingActive] = useState(false);
  const [sellerDetails, setSellerDetails] = useState(null);

  // Fetch item details
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/single-item/${id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItem();
  }, [id]);

  // Fetch bidding status
  useEffect(() => {
    const fetchBiddingStatus = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/bidding/${id}`);
        if (!response.ok) throw new Error("Failed to fetch bidding status");

        const data = await response.json();
        console.log("Bidding Data:", data);

        const biddingStatus = Array.isArray(data)
          ? data[0]?.status
          : data.status;
        console.log("Bidding status:", biddingStatus);

        setIsBiddingActive(biddingStatus === "active");
      } catch (error) {
        console.error("Error fetching bidding status:", error);
      }
    };

    fetchBiddingStatus();
  }, [id]);

  // Fetch top 3 bids
  // useEffect(() => {
  //   const fetchBids = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:5000/fetch-bids/${id}`);
  //       if (!response.ok) throw new Error("Failed to fetch bids");

  //       const data = await response.json();
  //       // Extract only the first 3 bids and map them to show anonymous users
  //       const topBids = data.slice(0, 3).map((bid) => ({
  //         bid_amount: bid[4], // Assuming bid_amount is at index 4
  //       }));

  //       setBids(topBids);
  //     } catch (error) {
  //       console.error("Error fetching bids:", error);
  //     }
  //   };

  //   fetchBids();
  // }, [id]);

  // fetch sellers
  const fetchSellers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/sellers");
      if (!response.ok) throw new Error("Failed to fetch sellers");

      const sellers = await response.json();

      // Find the seller matching the current item's seller_id
      const seller = sellers.find((s) => s.seller_id === item.seller_id);

      if (seller) {
        setSellerDetails(seller);
      }
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  // Fetch bids for the current item
  const fetchBids = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/fetch-bids/${id}`);
      if (!response.ok) throw new Error("Failed to fetch bid history");

      const data = await response.json();
      // Extract only the top 3 bids (amount only, anonymous user)
      const topBids = data.slice(0, 3).map((bid) => ({
        bid_amount: bid[5], // Adjust index based on your DB response
        user: "Anonymous",
      }));

      setBids(topBids);
    } catch (error) {
      console.error("Error fetching bids:", error);
    }
  };

  // Fetch bids when component loads
  useEffect(() => {
    fetchBids();
  }, [id]);

  const handleBidSubmit = async () => {
    if (!bidAmount) {
      console.error("Bid amount is required");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/bid/${item.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bid_amount: bidAmount,
          user_id: localStorage.getItem("user_id"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bid");
      }

      const result = await response.json();
      console.log(result.message);

      setBidAmount("");
      // Refresh bid history after placing a bid
      fetchBids();
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };
  useEffect(() => {
    if (item) {
      fetchSellers();
    }
  }, [item]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="bidding-page-container">
      <h1>{item.title}</h1>
      <div className="grid-container">
        <div className="image-column">
          <img
            src={`http://127.0.0.1:5000/static/uploads/${item.image}`}
            alt={item.title}
            className="item-image"
          />
        </div>
        <div className="details-column">
          <div className="description">
            <h2>Description:</h2>
            <p>{item.description}</p>
          </div>
          <div className="seller-details">
            <h2>Seller Details:</h2>
            {sellerDetails ? (
              <>
                <p>
                  <strong>Name:</strong> {sellerDetails.username}
                </p>
                <p>
                  <strong>Contact:</strong> {sellerDetails.phone}
                </p>
                <p>
                  <strong>Email:</strong> {sellerDetails.email}
                </p>
                <p>
                  <strong>Address:</strong> {sellerDetails.address}
                </p>

                {/* seller phone */}
              </>
            ) : (
              <p>Loading seller details...</p>
            )}
          </div>

          <div className="selling-price">
            <h2>Selling Price:</h2>
            <p>${item.base_price}</p>
            <input
              type="text"
              placeholder="Enter Bid Amount..."
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              disabled={!isBiddingActive}
            />
            <button onClick={handleBidSubmit} disabled={!isBiddingActive}>
              {isBiddingActive ? "Place Bid" : "Bidding Closed"}
            </button>
          </div>
          <div className="status">
            <h2>Status:</h2>
            <p className={isBiddingActive ? "active" : "closed"}>
              {isBiddingActive ? "Bid Active" : "Bid Inactive"}
            </p>
          </div>

          {/* Display Top 3 Bids */}
          <div className="bid-history">
            <h2>Top Bids:</h2>
            {bids.length > 0 ? (
              <ul>
                {bids.map((bid, index) => (
                  <li key={index}>Anonymous User - ${bid.bid_amount}</li>
                ))}
              </ul>
            ) : (
              <p>No bids yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingPage;

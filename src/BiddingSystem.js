import React, { useState } from "react";
import "./BiddingSystem.css";

const BiddingSystem = () => {
  const [bids, setBids] = useState([
    {
      id: 1,
      item: "Laptop",
      highestBid: 500,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      item: "Smartphone",
      highestBid: 300,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      item: "Tablet",
      highestBid: 200,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      item: "Headphones",
      highestBid: 100,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      item: "Camera",
      highestBid: 400,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      item: "Smartwatch",
      highestBid: 250,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      item: "Gaming Console",
      highestBid: 600,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      item: "Drone",
      highestBid: 700,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      item: "Monitor",
      highestBid: 350,
      image: "https://via.placeholder.com/150",
    },
  ]);
  const [bidAmount, setBidAmount] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const placeBid = (itemId) => {
    if (!bidAmount || bidAmount <= 0) return alert("Enter a valid bid amount");
    setBids((prevBids) =>
      prevBids.map((bid) =>
        bid.id === itemId && bidAmount > bid.highestBid
          ? { ...bid, highestBid: Number(bidAmount) }
          : bid
      )
    );
    setBidAmount("");
    alert("Bid placed successfully!");
  };

  return (
    <div className="container">
      <h1 className="title">Bidding System</h1>
      <div className="grid">
        {bids.map((bid) => (
          <div key={bid.id} className="card">
            <div className="card-content">
              <img src={bid.image} alt={bid.item} className="item-image" />
              <h2 className="item-name">{bid.item}</h2>
              <p>Highest Bid: ${bid.highestBid}</p>
              <input
                type="number"
                className="input"
                placeholder="Enter bid amount"
                value={selectedItem === bid.id ? bidAmount : ""}
                onChange={(e) => {
                  setSelectedItem(bid.id);
                  setBidAmount(e.target.value);
                }}
              />
              <button onClick={() => placeBid(bid.id)} className="button">
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiddingSystem;

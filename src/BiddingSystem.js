import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BiddingSystem.css";

const BiddingSystem = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/items");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data); // Log the API response
        setBids(data); // Set the fetched data directly
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Bidding System</h1>
      <div className="grid">
        {bids.map((bid) => (
          <div key={bid.id} className="card">
            <div className="card-content">
              {/* Display the image */}
              <img
                src={`http://127.0.0.1:5000/static/uploads/${bid.image}`}
                alt={bid.title}
                className="item-image"
              />
              {/* Display the title */}
              <h2 className="item-name">{bid.title}</h2>
              {/* Display the base price */}
              <p>Base Price: ${bid.base_price}</p>
              {/* Button to navigate to the single item page */}
              <button onClick={() => navigate(`/item/${bid.id}`)}>
                Start Bidding
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiddingSystem;

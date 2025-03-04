import React, { useState } from "react";
import "./BiddingAction.css";

const BiddingAction = () => {
  const [response, setResponse] = useState(null); // State to store API response
  const [loading, setLoading] = useState(false); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Function to handle the first API call
  const handleFirstApiCall = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the second API call
  const handleSecondApiCall = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-button-container">
      <h1>Manage Bidding</h1>

      {/* Buttons to trigger API calls */}
      <div className="buttons">
        <button onClick={handleFirstApiCall} disabled={loading}>
          Start Bidding
        </button>
        <button onClick={handleSecondApiCall} disabled={loading}>
          End Bidding
        </button>
      </div>

      {/* Display loading state */}
      {loading && <p>Loading...</p>}

      {/* Display error message */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Display API response */}
      {response && (
        <div className="response">
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default BiddingAction;
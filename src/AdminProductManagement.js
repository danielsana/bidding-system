import React, { useState, useEffect } from "react";
import "./AdminProductManagement.css"; // Import the CSS file

const AdminProductManagement = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [bidCounts, setBidCounts] = useState({}); // State to store bid counts
  const [startLoading, setStartLoading] = useState({}); // State for Start Bid button
  const [stopLoading, setStopLoading] = useState({}); // State for Stop Bid button

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/items");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        fetchBidCounts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch bid counts for all products
  const fetchBidCounts = async (products) => {
    const counts = {};
    await Promise.all(
      products.map(async (product) => {
        try {
          const response = await fetch(
            `http://127.0.0.1:5000/bids/count/${product.id}`
          );
          if (response.ok) {
            const data = await response.json();
            counts[product.id] = data.bid_count;
          } else {
            counts[product.id] = 0; // Default to 0 if there's an error
          }
        } catch {
          counts[product.id] = 0; // Handle errors
        }
      })
    );
    setBidCounts(counts);
  };

  const startBid = async (itemId) => {
    setStartLoading((prev) => ({ ...prev, [itemId]: true }));
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/admin/add-bid/${itemId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_id: itemId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to start bidding");
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === itemId ? { ...product, status: "active" } : product
        )
      );

      alert("Bidding started successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setStartLoading((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const stopBid = async (itemId) => {
    setStopLoading((prev) => ({ ...prev, [itemId]: true }));
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/admin/update-bid-time/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to stop bidding");
      }

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === itemId ? { ...product, status: "inactive" } : product
        )
      );

      alert("Bidding stopped successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setStopLoading((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-product-management">
      <h1>Admin Product Management</h1>
      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Item</th>
            <th>Highest Bid</th>
            <th>No. of Bids</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={`http://127.0.0.1:5000/static/uploads/${product.image}`}
                  alt={product.title}
                  className="item-image"
                />
              </td>
              <td>{product.title}</td>
              <td>${product.base_price}</td>
              <td>{bidCounts[product.id] || 0}</td> {/* New Column */}
              <td>
                <span
                  className={`status ${
                    product.status === "active" ? "active" : "inactive"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => startBid(product.id)}
                  disabled={
                    startLoading[product.id] || product.status === "active"
                  }
                  className="start-bid-button"
                >
                  {startLoading[product.id] ? "Starting..." : "Start Bid"}
                </button>
                <button
                  onClick={() => stopBid(product.id)}
                  disabled={
                    stopLoading[product.id] || product.status === "inactive"
                  }
                  className="stop-bid-button"
                >
                  {stopLoading[product.id] ? "Stopping..." : "Stop Bid"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductManagement;

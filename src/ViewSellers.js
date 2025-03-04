import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewSellers.css"; // Import the CSS file

const ViewSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // State for delete operation loading

  // Fetch sellers from the API
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/sellers");
        setSellers(response.data); // Assuming the API returns an array of sellers
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Function to delete a seller
  const deleteSeller = async (sellerId) => {
    setDeleteLoading(true);
    try {
      // Send DELETE request to the backend
      await axios.delete(
        `http://127.0.0.1:5000/sellers/${sellerId}`
      );

      // Remove the seller from the frontend state
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller.id !== sellerId)
      );

      alert("Seller deleted successfully!");
    } catch (err) {
      alert(`Error deleting seller: ${err.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="view-sellers-container">
      <h1>View Sellers</h1>
      <table className="sellers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.username}</td>
              <td>{seller.email}</td>
              <td>
                <button
                  onClick={() => deleteSeller(seller.id)}
                  disabled={deleteLoading}
                  className="delete-button"
                >
                  {deleteLoading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSellers;

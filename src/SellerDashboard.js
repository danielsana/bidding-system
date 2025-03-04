import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellerDashboard.css"; // Import the CSS file
import { useNavigate } from "react-router-dom"; // Import useNavigate for logout redirection
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    base_price: "",
    image: null, // Add image field
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch seller_id from local storage
  const sellerId = localStorage.getItem("seller_id");

  // Fetch products for the seller
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/items/${sellerId}`
      );
      console.log("Fetched Products:", response.data); // Debugging: Log the response
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add a new product
  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("seller_id", sellerId);
      formData.append("title", newProduct.title);
      formData.append("description", newProduct.description);
      formData.append("base_price", newProduct.base_price);
      formData.append("image", newProduct.image); // Append the image file

      const response = await axios.post(
        "http://127.0.0.1:5000/add-items",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts([...products, response.data]); // Add the new product to the list
      setNewProduct({
        title: "",
        description: "",
        base_price: "",
        image: null,
      }); // Reset form
      // alert("Product added successfully! .");
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle input changes for the new product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("seller_id"); // Remove seller_id from local storage
    navigate("/"); // Redirect to the login page
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [sellerId]);

  return (
    <div className="seller-dashboard">
      {/* Header with Logout Button */}
      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ToastContainer />

      {/* Add Product Form */}
      <div className="add-product-form">
        <h2>Add Product</h2>
        <form onSubmit={addProduct}>
          <div>
            <label>Product Title:</label>
            <input
              type="text"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Base Price:</label>
            <input
              type="number"
              name="base_price"
              value={newProduct.base_price}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          <div>
            <label>Product Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      {/* Product Table */}
      <h2>Your Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Base Price</th>
            <th>Image</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>
                {/* Safely handle undefined or null base_price */}
                {product.base_price
                  ? `$${parseFloat(product.base_price).toFixed(2)}`
                  : "N/A"}
              </td>
              <td>
                {product.image && (
                  <img
                    src={`http://127.0.0.1:5000/static/uploads/${product.image}`}
                    alt={product.title}
                    width="50"
                  />
                )}
              </td>
              <td>{product.end_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerDashboard;

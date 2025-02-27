import React, { useState } from "react";
import "./AddProductPage.css"; // Import the CSS file

const AddProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    base_price: "",
    image: null, // Store the image file
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({
        ...product,
        image: file, // Store the image file
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Retrieve seller_id from localStorage
      const seller_id = localStorage.getItem("seller_id");

      if (!seller_id) {
        throw new Error("Seller ID not found in localStorage");
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("base_price", product.base_price);
      formData.append("image", product.image);
      formData.append("seller_id", seller_id); // Append seller_id to formData

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send the request
      const response = await fetch(
        "https://maxmusau.pythonanywhere.com/add-items",
        {
          method: "POST",
          body: formData, // No need for headers
        }
      );

      if (!response.ok) throw new Error("Failed to add item");

      const result = await response.json();
      console.log("Item added successfully:", result);

      // Reset the form
      setProduct({
        title: "",
        description: "",
        base_price: "",
        image: null,
      });

      setSuccess("Item added successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Base Price ($):</label>
          <input
            type="number"
            name="base_price"
            value={product.base_price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding Item..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;

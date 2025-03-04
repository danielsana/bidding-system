import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // Ensure this matches the API's expected field
          password: password, // Ensure this matches the API's expected field
        }),
      });

      console.log("Response status:", response.status); // Log the status code
      const data = await response.json(); // Parse the response body
      console.log("Response data:", data); // Log the response data
      console.log("Response data role:", data.role); // Log the response data
      console.log("Response id:", data.id); // Log the response data

      if (response.ok) {
        // Handle successful login
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("email", email); // Optionally store the email
        localStorage.setItem("seller_id", data.seller_id); // Store the user's role
        localStorage.setItem("user_id", data.id);

        // Redirect based on the user's role
        switch (data.role) {
          case "user":
            console.log("Redirecting to /bidding");
            navigate("/bidding");
            console.log("Response data role:", data.role); // Log the response data

            break;
          case "seller":
            console.log("Redirecting to /sellerDashboard");
            navigate("/sellerDashboard");
            console.log("Response data role:", data.role); // Log the response data

            break;
          case "admin":
            console.log("Redirecting to /admin-dashboard");
            navigate("/admin-dashboard");
            console.log("Response data role:", data.role); // Log the response data

            break;
          default:
            console.log("Redirecting to /");
            navigate("/"); // Default fallback
            console.log("Response data role:", data.role); // Log the response data
        }
        // console.log("Response data role:", data.role); // Log the response data
      } else {
        // Handle errors
        setError(data.message || "Invalid credentials or user does not exist");
      }
    } catch (err) {
      console.error("Error during login:", err); // Log any errors
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email" // Use type="email" for better validation
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span className="signup-link" onClick={() => navigate("/signup")}>
          SignUp User
        </span>
        <span
          className="signup-link"
          onClick={() => navigate("/signupseller")}
        >
          SignUp Seller
        </span>
      </p>
    </div>
  );
};

export default Login;

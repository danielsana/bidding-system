import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupSeller.css";

const SignupSeller = () => {
  const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Prepare the request body
    const requestBody = {
      username,
      email,
      phone,
      address,
      password,
      role,
    };

    try {
      // Make the API call to register the user
      const response = await fetch("http://127.0.0.1:5000/add-seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register");
      }

      // Handle successful registration
      alert("Account created successfully! You can now log in.");
      navigate("/"); // Redirect to login page after successful signup
    } catch (err) {
      // Handle errors
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* phone */}
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="seller">seller</option>
          {/* seller */}
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="login-link" onClick={() => navigate("/")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default SignupSeller;

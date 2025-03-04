import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.css"; // Import the CSS file

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false); // State for delete operation loading

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/users");
        setUsers(response.data); // Assuming the API returns an array of users
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    setDeleteLoading(true);
    try {
      // Send DELETE request to the backend
      await axios.delete(`http://127.0.0.1:5000/users/${userId}`);

      // Remove the user from the frontend state
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      alert("User deleted successfully!");
    } catch (err) {
      alert(`Error deleting user: ${err.message}`);
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
    <div className="user-table-container">
      <h1>User Table</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => deleteUser(user.id)}
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

export default UserTable;

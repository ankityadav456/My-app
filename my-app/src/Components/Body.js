// Crud Operation -- 11/01

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Body() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // ============================================ local storage
  // // Load users from localStorage when the component mounts
  // useEffect(() => {
  //   const storedUsers = JSON.parse(localStorage.getItem("users"));
  //   if (storedUsers) {
  //     setUsers(storedUsers);
  //   }
  // }, []);

  // // Save users to localStorage whenever the users state changes
  // useEffect(() => {
  //   if (users.length > 0) {
  //     localStorage.setItem("users", JSON.stringify(users));
  //   }
  // }, [users]);
  // ==========================================================
  // ==================== server ===========================
  useEffect(() => {
    // Fetch users data from the Node.js backend
    axios.get('https://lzkd7k-8080.csb.app/users')
      .then((response) => {
        // console.log(response);
        setUsers(response.data);  // Update the state with the fetched users
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
        setLoading(false);
      });
  }, []);  // Empty array ensures this runs only once when the component mounts
  // ===========================================

  const handleEdit = (userid) => {
    navigate(`/edit/${userid}`)
  };

  const createUser = (e) => {
    navigate('/create');
  }

  const handleDelete = (id) => {
    axios.delete(`https://lzkd7k-8080.csb.app/users/${id}`)
      .then(response => {
        console.log(response.data.message); // Log the success message
        // Filter out the deleted user from the state
        setUsers(users.filter(user => user.id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the user!", error);
      });
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User Management</h2>
      <div className="col-12 text-end">
        <button type="button" className="btn btn-primary text-end" onClick={createUser}>Create</button>
      </div>
      <h3>User List</h3>
      <div className="border border-3 p-5 py-3 px-4">
        <table className="table table-bordered align-middle mb-0">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {
            users.map((user, key) => (
              <tr key={key + 1}>
                <td>{key + 1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.age}</td>
                <td className="text-center"><button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user.id)}>
                  Edit
                </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button></td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Body;

// --------------------------------------

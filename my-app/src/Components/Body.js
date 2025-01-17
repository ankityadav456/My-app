// Crud Operation -- 11/01

import React, { useEffect, useState } from "react";
import axios from 'axios';
function Body() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: "", firstname: "", lastname: "", age: "" });
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

  // ==================== server
  useEffect(() => {
    // Fetch users data from the Node.js backend
    axios.get('https://lzkd7k-5000.csb.app/users')
      .then((response) => {
        setUsers(response.data);  // Update the state with the fetched users
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);  // Empty array ensures this runs only once when the component mounts
  // ============================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.firstname && formData.lastname) {
      // if (formData.id) {
      //   setUsers(
      //     users.map((user) =>
      //       user.id === formData.id
      //         ? { ...user, firstname: formData.firstname, lastname: formData.lastname, age: formData.age }
      //         : user
      //     )
      //   );
      // } else {
      //   setUsers([...users,{ id: Date.now(), firstname: formData.firstname, lastname: formData.lastname, age: formData.age },]);
      // }
      // setFormData({ id: "", firstname: "", lastname: "", age: "" });
      
      // =================  server ===============

      axios.post('https://lzkd7k-5000.csb.app/users', formData)
        .then((response) => {
          if (response.data.id) {
          setUsers([...users, response.data]);  // Add the new user to the list
          setFormData({ firstname: '', lastname: '', age: '' });  // Reset the form
          }
        })
        .catch((error) => {
          console.error('There was an error adding the user!', error);
        });
      // ===============================================

    } else {
      alert("Please fill in both fields");
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container mt-5">
      {/* <h2 className="text-center mb-4">User Management</h2> */}
      <form onSubmit={handleFormSubmit} className="mb-4 border border-3 p-5">
        <div className="row row-cols-2 row-cols-md-3 mb-3">
          <div className="col">
            <label htmlFor="name" className="form-label">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="form-control"
              id="name"
              placeholder="Enter First Name"
            />
          </div>
          <div className="col mb-3">
            <label htmlFor="email" className="form-label">Last name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="form-control"
              id="email"
              placeholder="Enter Last Name"
            />
          </div>
          <div className="col mb-3">
            <label htmlFor="email" className="form-label">Age</label>
            <input
              type="number"
              name="age"
              min="0"
              value={formData.age}
              onChange={handleInputChange}
              className="form-control"
              id="age"
              placeholder="Enter Age"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {formData.id ? "Update" : "Add"} User
        </button>
      </form>
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
            {users.map((user, key) => (
              user.id = key + 1,
              <tr key={key + 1}>
                <td>{user.id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.age}</td>
                <td className="text-center"><button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Body;

// --------------------------------------

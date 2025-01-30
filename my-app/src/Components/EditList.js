import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditList(prop) {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: "", firstname: "", lastname: "", age: "" });
  const navigate = useNavigate();
  const { id } = useParams(); 
 
  // ==================== server
  useEffect(() => {
    // Fetch users data from the Node.js backend
    axios.get(`https://lzkd7k-5002.csb.app/users/${id}`)
      .then((response) => {
        setFormData(response.data);  // Update the state with the fetched users
        setLoading(false);
        console.log(users)
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
        setLoading(false);
        console.log(users)
      });
  }, [id]);  // Empty array ensures this runs only once when the component mounts
  // ============================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };


  const BackToList = () => {
    navigate('/home')
  }

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
      //   navigate('/home');
      // }
      // setFormData({ id: "", firstname: "", lastname: "", age: "" });

      // =================  server ===============

      axios.patch(`https://lzkd7k-5002.csb.app/users/${id}`, formData)
        .then((response) => {
          console.log("User updated:", response.data);
          navigate('/home'); // Redirect to home page after updating
        })
        .catch((error) => {
          console.error('There was an error adding the user!', error);
        });
      // ===============================================

    } else {
      alert("Please fill in both fields");
    }
    // Show loading spinner while fetching data
    if (loading) return <p>Loading...</p>;
  };
  return (
    <div className="p-7">
      {/* <Header/> */}
      <h3>Create User</h3>
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
        <button type="button" className="btn btn-secondary ms-3" onClick={() => BackToList()}>Back</button>
      </form>
    </div>
  );
}

export default EditList;

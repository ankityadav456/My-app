import './App.css';
import React, { useState } from 'react';

function App() {
  const [users, setUsers] = useState([]); 
  const [formData, setFormData] = useState({ id: null, name: '', address: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      setUsers(users.map(user => (user.id === formData.id ? formData : user)));
      setIsEditing(false);
    } else {
      const newUser = { ...formData, id: Date.now() };  
      setUsers([...users, newUser]);
      setFormData({ id: null, name: '', address: '' });  
    }
  };

  return (
    <>
      <h1>CRUD Operation</h1>
      <form onSubmit={handleSubmit}> 
        <input
          type="text"
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          placeholder="Enter Name"
        />
        <input
          type="text"
          name="address"
          onChange={handleInputChange}
          value={formData.address}
          placeholder="Enter Address" 
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}, {user.address}
            {/* Use anonymous function to avoid immediate invocation */}
            <button type="button" onClick={() => handleEdit(user)}>Edit</button>
            <button type="button" onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

// import { useState } from 'react';
// import './App.css';



// function App() {

//   const[name,setName] = useState('');

//   const handelSubmit = (e) => {
//     e.preventDefualt();
//     alert('');
//   }

//   return (
//     <div>
//     <div>
//       <form onSubmit={handelSubmit()}>
//         <label>First Name : </label>
//         <input class="form-control" id="firstName"/>
//         <label>Last Name : </label>
//         <input class="form-control" id="lastName" value={setName()} />
//         <button >Submit</button>
//       </form>
//       </div>  
//     </div>
//   );
// }

// // export default App;
// import React, { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// function App() {
//   // State to hold list of users
//   const [users, setUsers] = useState([]);
  
//   // State for form input fields (name and email)
//   const [formData, setFormData] = useState({ id: "", name: "", email: "" });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submit (Add or Edit)
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (formData.name && formData.email) {
//       if (formData.id) {
//         // Edit user
//         setUsers(users.map((user) =>
//           user.id === formData.id ? { ...user, name: formData.name, email: formData.email } : user
//         ));
//       } else {
//         // Add new user
//         setUsers([...users, { id: Date.now(), name: formData.name, email: formData.email }]);
//       }
//       // Reset form data
//       setFormData({ id: "", name: "", email: "" });
//     } else {
//       alert("Please fill in both fields");
//     }
//   };

//   // Handle edit button click
//   const handleEdit = (user) => {
//     setFormData(user);
//   };

//   // Handle delete button click
//   const handleDelete = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div className="App container mt-5">
//       <h1 className="text-center mb-4"></h1>

//       {/* Form for adding/editing users */}
//       <form onSubmit={handleFormSubmit} className="mb-4">
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             className="form-control "
//             id="name"
//             placeholder="Enter name"
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input
//             type="text"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="form-control"
//             id="email"
//             placeholder="Enter email"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           {formData.id ? "Update" : "Add"} User
//         </button>
//       </form>

//       <h2>User List</h2>
//       <ul className="list-group">
//         {users.map((user) => (
//           <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
//             {user.name} - {user.email}
//             <div>
//               <button
//                 className="btn btn-warning btn-sm me-2"
//                 onClick={() => handleEdit(user)}
//               >
//                 Edit
//               </button>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => handleDelete(user.id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
// import Body from "./Components/Body";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </nav>
//         <nav className="navbar navbar-expand-lg bg-body-tertiary">
//     <div className="container-fluid">
//       <a className="navbar-brand" href="#">Navbar</a>
//       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//           <li className="nav-item">
//             <a className="nav-link active" aria-current="page" href="#">Home</a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">Link</a>
//           </li>
//           <li className="nav-item dropdown">
//             <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//               Dropdown
//             </a>
//             <ul className="dropdown-menu">
//               <li><a className="dropdown-item" href="#">Action</a></li>
//               <li><a className="dropdown-item" href="#">Another action</a></li>
//               <li><a className="dropdown-item" href="#">Something else here</a></li>
//             </ul>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link disabled" aria-disabled="true">Disabled</a>
//           </li>
//         </ul>
//         <form className="d-flex" role="search">
//           <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
//           <button className="btn btn-outline-success" type="submit">Search</button>
//         </form>
//       </div>
//     </div>
//   </nav>
//         {/* <Switch> */}
//           {/* Define your routes */}
//           <Routes>
//           <Route path="/" exact Component={Header} />
//           <Route path="/about" Component={Body} />
//           <Route path="/contact" Component={Footer} />
//         {/* </Switch> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css'; // Add Tailwind styles to your project

// Import Components
import LoginPage from './Components/Login';
import HomePage from './Components/Home';
import Layout from './Components/Layout'; // Import the Layout component
import Create from './Components/CreateList';
import Edit from './Components/EditList';

function App() {
  // Check for authentication status from localStorage when the app loads
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('loggedIn');
  //   if (loggedIn) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedin");
    if(loggedIn){
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  },[]);


  const logIn = () => {
    setIsAuthenticated(true);
    localStorage.setItem("loggedin", true);
  }

  const logOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("loggedin");
  }



  return (
    <Router>
      <Routes>
        {/* Define a route for the layout with the header and footer */}
        <Route element={<Layout logout={logOut} />}>
          {/* Define your protected routes within the Layout */}
          <Route path="/" element={isAuthenticated ? <HomePage logout={logOut} /> : <LoginPage login={logIn} />} />
          <Route path="/home" element={isAuthenticated ? <HomePage logout={logOut} /> : <LoginPage login={logIn} />} />
          <Route path="/create" element={isAuthenticated ? <Create logout={logOut} /> : <LoginPage login={logIn} />} />
          <Route path="/edit/:id" element={isAuthenticated ? <Edit logout={logOut} /> : <LoginPage login={logIn} />} />
        </Route>

        {/* Public route */}    
        <Route path="/login" element={<LoginPage login={logIn} />} />
      </Routes>
    </Router>
  );
}

export default App;

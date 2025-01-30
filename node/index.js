const express = require('express');
const cors = require('cors');
const app = express();
const port = 5002;  // Backend will run on port 5000

// Use CORS to allow cross-origin requests from React (which usually runs on a different port, like 3000)
app.use(cors());
app.use(express.json()); // To parse JSON data in request bodies

const users = [
  { id: 1, firstname: 'John', lastname: 'Doe', age: 25 },
  { id: 2, firstname: 'Jane', lastname: 'Doe', age: 28 },
  { id: 3, firstname: 'mark', lastname: 'mark', age: 30 },
];

// Simple route for GET request
// GET route to fetch all users
app.get('/users', (req, res) => {
  res.json(users); // Send all users as a response
});

// GET route to fetch a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (user) {
    res.json(user); // Send the specific user data
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route to handle POST requests for adding users
app.post('/users', (req, res) => {
  console.log(req.body);
  const newUser = req.body;  // Get the user from the request body
  Ids = Math.max(...users.map(item => item.id)) + 1;
  newUser.id = Ids;  // Assign a unique ID based on the timestamp
  users.push(newUser);
  console.log(users);
  res.status(201).json(newUser);  // Return the new user with a success status
});

// Route to handle DELETE requests for deleting a user by ID
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);  // Get the user ID from the URL parameter

  // Find the index of the user to be deleted
  const index = users.findIndex(user => user.id == userId);

  if (index !== -1) {
    // Remove the user from the array
    users.splice(index, 1);
    console.log(`User with id ${userId} deleted`);
    res.status(200).json({ message: `User with id ${userId} deleted successfully` });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// PATCH route to update a specific user by ID
app.patch('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Get the user ID from the URL
  const updatedUserData = req.body; // Get the updated user data from the request body

  // Find the user by ID
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex !== -1) {
    // Update the user details
    users[userIndex] = { ...users[userIndex], ...updatedUserData };
    
    // Respond with the updated user data
    res.json(users[userIndex]);
  } else {
    // If the user is not found, return a 404 error
    res.status(404).json({ message: 'User not found' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

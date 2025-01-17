const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;  // Backend will run on port 5000

// Use CORS to allow cross-origin requests from React (which usually runs on a different port, like 3000)
app.use(cors());
app.use(express.json()); // To parse JSON data in request bodies

const users = [
  { id: 1, firstname: 'John', lastname: 'Doe', age: 25 },
  { id: 2, firstname: 'Jane', lastname: 'Doe', age: 28 },
  { id: 2, firstname: 'mark', lastname: 'mark', age: 30 },
];

// // Simple route for GET request
app.get('/users', (req, res) => {
  res.json(users);  // Send the users array as a response
});

// Route to handle POST requests for adding users
app.post('/users', (req, res) => {
  const newUser = req.body;  // Get the user from the request body
  newUser.id = Date.now();  // Assign a unique ID based on the timestamp
  users.push(newUser);
  console.log(newUser);
  res.status(201).json(newUser);  // Return the new user with a success status
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

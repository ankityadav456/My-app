const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());  // Allow all origins by default
app.use(express.json()); // Parse incoming JSON requests

// Example tasks data
let tasks = [
  {
    id: 1,
    text: 'Complete React Project',
    description: 'Finish building the todo app with React and Express.',
    priority: 'High',
    category: 'Work',
    completed: false,
  },
  {
    id: 2,
    text: 'Buy Groceries',
    description: 'Purchase groceries for the week, including fruits, vegetables, and milk.',
    priority: 'Medium',
    category: 'Personal',
    completed: false,
  },
  {
    id: 3,
    text: 'Plan Vacation',
    description: 'Research and plan a vacation to the mountains.',
    priority: 'Low',
    category: 'Personal',
    completed: true,
  },
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks); // Send the array of tasks as a JSON response
  console.log(tasks);
});

// GET route to fetch a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const { id } = req.params; // Extract task ID from the URL
  const task = tasks.find(task => task.id == id); // Find task by ID

  if (task) {
    res.json(task); // If found, return the task
  } else {
    res.status(404).json({ message: 'Task not found' }); // If not found, return 404 error
  }
});

// Add a new task
app.post('/tasks', (req, res) => {
  const newTask = req.body; // Access the request body for the new task
  newTask.id = Date.now(); // Assign a unique ID (using current timestamp)
  tasks.push(newTask); // Add the new task to the tasks array
  res.status(201).json(newTask); // Return the new task as a response
});

// Edit an existing task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params; // Extract task ID from the URL
  const updatedTask = req.body; // Access the updated task data from the request body
  const taskIndex = tasks.findIndex(task => task.id == id); // Find the index of the task to update

  if (taskIndex >= 0) {
    // If task is found, update it
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask }; // Merge old task with new data
    res.json(tasks[taskIndex]); // Return the updated task
  } else {
    res.status(404).json({ message: 'Task not found' }); // If task doesn't exist, return 404
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params; // Extract task ID from the URL
  const taskIndex = tasks.findIndex(task => task.id == id); // Find the index of the task to delete

  if (taskIndex >= 0) {
    tasks.splice(taskIndex, 1); // Remove the task from the array
    res.status(204).send(); // Send a no content status, indicating successful deletion
  } else {
    res.status(404).json({ message: 'Task not found' }); // If task not found, return 404
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

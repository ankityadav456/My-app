import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateNote from './components/CreateNote';
import Footer from './components/Footer';

function App() {
  // Initialize tasks state, trying to get tasks from localStorage if available
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Loading state to show spinner while fetching tasks
  const [loading, setLoading] = useState(true);

  // UseEffect with async/await for fetching tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('https://lzkd7k-8080.csb.app/tasks'); // Replace with your backend URL
        setTasks(response.data);  // Set tasks from backend
        setLoading(false);         // Hide loader when data is fetched
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);         // Hide loader in case of error
      }
    };

    fetchTasks(); // Call the async function to fetch tasks
  }, []);

  // Handle adding or editing a task
  // Handle adding or editing a task
  const handleAddOrEditTask = async (task) => {
    try {
      if (task.id) {
        // Edit task
        const response = await axios.put(`https://lzkd7k-8080.csb.app/tasks/${task.id}`, task);
        setTasks(tasks.map(t => (t.id === task.id ? task : t))); // Update task
      } else {
        // Add new task
        const response = await axios.post('https://lzkd7k-8080.csb.app/tasks', task);
        setTasks([...tasks, { ...task, id: Date.now(), completed: false }]); // Add task
      }
    } catch (error) {
      console.error('Error adding or editing task:', error);
      if (error.response) {
        console.error('Response error:', error.response.data); // If response is available
      } else {
        console.error('Network error or no response received');
      }
    }
  };
  


  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion status
  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-all`}>
        {/* Navbar */}
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Loader (Display while fetching tasks) */}
        {loading && (
          <div className="fixed inset-0 bg-opacity-50 bg-gray-700 flex items-center justify-center z-50">
            <div className="spinner w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        <main className={`border-t my-10 py-6  ${darkMode ? 'border-white' : 'border-gray-400'}`}>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  tasks={tasks}
                  handleDeleteTask={handleDeleteTask}
                  handleToggleComplete={handleToggleComplete}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/create"
              element={
                <CreateNote
                  handleAddOrEditTask={handleAddOrEditTask}
                  darkMode={darkMode}
                />
              }
            />
            <Route
              path="/edit/:taskId"
              element={
                <CreateNote
                  handleAddOrEditTask={handleAddOrEditTask}
                  tasks={tasks}
                  darkMode={darkMode}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
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

  // Sync tasks with localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Handle adding or editing a task
  const handleAddOrEditTask = (task) => {
    if (task.id) {
      // Edit task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      // Add new task
      setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
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

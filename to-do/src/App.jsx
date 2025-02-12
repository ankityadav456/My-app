import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateNote from './components/CreateNote';

function App() {
  // Initialize tasks state, trying to get tasks from localStorage if available
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("task");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]); // Add tasks as a dependency

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

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="p-5">
          <Routes>
            <Route
              path="/"
              element={<Home tasks={tasks} handleDeleteTask={handleDeleteTask} handleToggleComplete={handleToggleComplete} />}
            />
            <Route
              path="/create"
              element={<CreateNote handleAddOrEditTask={handleAddOrEditTask} />}
            />
            <Route
              path="/edit/:taskId"
              element={<CreateNote handleAddOrEditTask={handleAddOrEditTask} tasks={tasks} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

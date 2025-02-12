import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateNote from './components/CreateNote';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Function to add or edit tasks
  const handleAddOrEditTask = (task) => {
    if (task.id) {
      // Edit task
      setTasks(tasks.map(t => t.id === task.id ? task : t));
    } else {
      // Add new task
      setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={darkMode ? 'bg-gray-500 text-white' : 'bg-gray-100 text-black'}>
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <div className="p-5">
          <Routes>
            <Route path="/" element={<Home tasks={tasks} />} />
            <Route path="/create" element={<CreateNote handleAddOrEditTask={handleAddOrEditTask} />} />
            <Route path="/edit/:taskId" element={<CreateNote handleAddOrEditTask={handleAddOrEditTask} />} /> {/* Edit route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

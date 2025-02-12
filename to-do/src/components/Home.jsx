import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home({ tasks }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(""); // Track selected priority tab
  const [darkMode, setDarkMode] = useState(false);

  // Filter tasks by search term
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter tasks based on selected priority
  const priorityFilteredTasks = selectedPriority
    ? filteredTasks.filter(task => task.priority === selectedPriority)
    : filteredTasks;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`min-h-screen p-5 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="mb-4">
        <input
          type="text"
          className={`w-full px-4 py-2 border rounded-md ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 ${selectedPriority === "" ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded-md`}
          onClick={() => setSelectedPriority("")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 ${selectedPriority === "High" ? 'bg-red-500' : 'bg-gray-300'} text-white rounded-md`}
          onClick={() => setSelectedPriority("High")}
        >
          High
        </button>
        <button
          className={`px-4 py-2 ${selectedPriority === "Medium" ? 'bg-yellow-500' : 'bg-gray-300'} text-white rounded-md`}
          onClick={() => setSelectedPriority("Medium")}
        >
          Medium
        </button>
        <button
          className={`px-4 py-2 ${selectedPriority === "Low" ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-md`}
          onClick={() => setSelectedPriority("Low")}
        >
          Low
        </button>
      </div>

      <Link to="/create">
        <button className={`px-4 py-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-md`}>
          Add New Task
        </button>
      </Link>

      <div className="mt-4">
        {priorityFilteredTasks.length === 0 ? (
          <div>No tasks found. Try adding some tasks or searching.</div>
        ) : (
          priorityFilteredTasks.map(task => (
            <motion.div key={task.id} className="p-4 border mb-2 rounded-md">
              <h3>{task.text}</h3>
              <p>{task.description}</p>
              <span>{task.priority}</span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

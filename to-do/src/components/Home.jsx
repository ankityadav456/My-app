import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaPlus, FaSearch  } from 'react-icons/fa'; // Import icons

function Home({ tasks, handleDeleteTask, handleToggleComplete, darkMode, toggleDarkMode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

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

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
        <div className="relative mb-5">
      {/* Input field */}
      <input
        type="text"
        className={`w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Search Icon */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>

      <div className="flex space-x-4 mb-4 justify-between items-center">
      <div className="space-x-4 mb-4">
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
        <div>
        <Link to="/create">
          <button className={`px-4 py-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} text-white rounded-md flex items-center space-x-2`}>
            <FaPlus />
            <span>Add New Task</span>
          </button>
        </Link>
        </div>
      </div>



      <div className="mt-4 border rounded-lg shadow-xl p-6 bg-gradient-to-r from-white-50 to-grey-100">
        {priorityFilteredTasks.length === 0 ? (
          <div className="text-center text-gray-500 font-medium">No tasks found. Try adding some tasks or searching.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {priorityFilteredTasks.map(task => (
              <motion.div
                key={task.id}
                className="relative p-5 border rounded-lg shadow-lg hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105 flex flex-col"
              >
                {/* Mark Complete Button at the Top-Right */}
                <button
                  className={`absolute top-2 right-2 px-4 py-2 text-sm ${task.completed ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-md flex items-center space-x-2 hover:bg-green-600 transition-all`}
                  onClick={() => handleToggleComplete(task.id)}
                >
                  <FaCheck />
                  <span>{task.completed ? 'Completed' : 'Mark Complete'}</span>
                </button>

                <div className="flex flex-col space-y-3 mt-10 flex-grow">
                  <h3
                    className={`text-xl font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}
                  >
                    {task.text}
                  </h3>

                  {/* Responsive description */}
                  <p className="text-sm sm:text-base text-gray-700 line-clamp-3">{task.description}</p>

                  {/* Responsive priority */}
                  <span
                    className={`font-semibold text-sm sm:text-base ${task.priority === 'High'
                        ? 'text-red-500'
                        : task.priority === 'Medium'
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      }`}
                  >
                    {task.priority}
                  </span>
                </div>

                {/* Buttons (always at the bottom) */}
                <div className="flex flex-wrap space-x-4 mt-6 gap-4 justify-between">
                  {/* Edit Button */}
                  <Link to={`/edit/${task.id}`}>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm flex items-center space-x-2 hover:bg-yellow-600 transition-all w-full sm:w-auto">
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md text-sm flex items-center space-x-2 hover:bg-red-600 transition-all w-auto"
                  >
                    <FaTrash />
                    <span>Delete</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>



    </div>
  );
}

export default Home;

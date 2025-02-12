// src/components/NavBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; // Add icons

function NavBar({ darkMode, toggleDarkMode }) {
  return (
    <nav className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} transition-all duration-300`}>
      <h1 className="text-2xl font-bold cursor-pointer">
        <Link to="/">Task Manager</Link>
      </h1>
      <div className="flex items-center space-x-4">
        <Link to="/" className="px-4 py-2">Home</Link>
        <Link to="/create" className="px-4 py-2">Create Task</Link>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="p-2">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

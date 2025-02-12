import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa"; // Add hamburger menu icons

function NavBar({ darkMode, toggleDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle menu open/close

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} transition-all duration-300 z-10`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer">
          <Link to="/">Task Manager</Link>
        </h1>

        {/* Hamburger icon for small screens */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Toggle between bar and close icon */}
          </button>
        </div>

        {/* Links and Dark Mode Toggle */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/" className="px-4 py-2">Home</Link>
          <Link to="/create" className="px-4 py-2">Create Task</Link>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - appears below navbar */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 w-full bg-${darkMode ? 'gray-800' : 'gray-100'} py-4 flex flex-col items-center space-y-4`}>
          <Link to="/" className="px-4 py-2">Home</Link>
          <Link to="/create" className="px-4 py-2">Create Task</Link>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

import React from 'react';

function NavBar({ darkMode, toggleDarkMode }) {
  return (
    <nav className={`flex justify-between items-center p-4 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}>
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <div className="flex items-center space-x-4">
        {/* Add your navigation links here */}
        <button className="px-4 py-2" onClick={() => alert('Go to Home')}>Home</button>
        <button className="px-4 py-2" onClick={() => alert('Go to Create/Edit Task')}>Create Task</button>
        
        {/* Dark Mode Toggle */}
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-lg"
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar;

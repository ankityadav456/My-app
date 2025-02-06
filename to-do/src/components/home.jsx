import React, { useState } from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [note, setNote] = useState({
    id: "",
    note: "",
    description: "",
    category: "",
    priority: "Low",
    dueDate: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null); // For tracking task being edited

  // Handle form submit for adding or editing tasks
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.note || !note.description || !note.category || !note.dueDate) {
      setError("All fields are required!");
      return;
    }

    if (editMode) {
      // Edit existing task
      setTasks(tasks.map(task => task.id === editTaskId ? { ...task, ...note } : task));
      setEditMode(false);
      setEditTaskId(null);
    } else {
      // Add new task
      setTasks([
        ...tasks,
        { id: Date.now(), text: note.note, description: note.description, category: note.category, priority: note.priority, dueDate: note.dueDate, completed: false }
      ]);
    }

    // Reset form
    setNote({ id: "", note: "", description: "", category: "", priority: "Low", dueDate: "" });
    setError("");
  };

  // Handle input change for task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  // Toggle completion status of a task
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  // Delete task with confirmation
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Sort tasks by priority or due date
  const sortTasks = (type) => {
    if (type === "priority") {
      setTasks([...tasks].sort((a, b) => a.priority.localeCompare(b.priority)));
    } else if (type === "dueDate") {
      setTasks([...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Edit task functionality
  const handleEditTask = (task) => {
    setNote({
      id: task.id,
      note: task.text,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setEditMode(true);
    setEditTaskId(task.id);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={darkMode ? 'container p-5 bg-dark text-light' : 'container p-5'}>
      <div className="d-flex justify-content-between mb-4">
        <h1>Task Manager</h1>
        <button className="btn btn-secondary" onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className='col'>
            <label htmlFor="note" className="form-label">Note</label>
            <input
              type="text"
              name="note"
              value={note.note}
              onChange={handleInputChange}
              className="form-control"
              id="note"
              placeholder="Enter Note"
              autoFocus
            />
          </div>

          <div className='col'>
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              name="description"
              value={note.description}
              onChange={handleInputChange}
              className="form-control"
              id="description"
              placeholder="Enter Description"
            />
          </div>

          <div className='col'>
            <label htmlFor="category" className="form-label">Category</label>
            <select
              name="category"
              value={note.category}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className='col'>
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              name="priority"
              value={note.priority}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className='col'>
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={note.dueDate}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className='col d-flex align-items-center mt-4'>
            <button type='submit' className='btn btn-primary w-100'>
              {editMode ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <hr />

      <div className="row mb-3">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div className="card-title">Notes List</div>
          <button
            className="btn btn-warning btn-sm"
            onClick={() => sortTasks("priority")}
          >
            Sort by Priority
          </button>
          <button
            className="btn btn-warning btn-sm ms-2"
            onClick={() => sortTasks("dueDate")}
          >
            Sort by Due Date
          </button>
        </div>

        <div className="card-body">
          <div className="row">
            {filteredTasks.length === 0 ? (
              <div className="col-12 text-center">
                <p>No tasks found. Try adding some tasks or searching.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  className="col-md-4 mb-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={task.completed}
                          onChange={() => toggleComplete(task.id)}
                        />
                        <span
                          className={`ms-2 ${task.completed ? 'text-decoration-line-through' : ''}`}
                        >
                          <h5 className="card-title">{task.text}</h5>
                        </span>
                      </div>
                      <p className="card-text">{task.description}</p>
                      <div className={`badge bg-secondary`}>{task.category}</div>
                      <div className={`badge ${task.priority === "High" ? "bg-danger" : task.priority === "Medium" ? "bg-warning" : "bg-success"} ms-2`}>
                        {task.priority} Priority
                      </div>
                      <p className="text-muted mt-2">Due Date: {task.dueDate}</p>
                      <button
                        className="btn btn-warning btn-sm mt-3"
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm mt-3 ms-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

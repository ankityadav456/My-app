import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

function CreateNote({ handleAddOrEditTask, darkMode }) {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState({
    text: '',
    description: '',
    priority: '',
    category: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (taskId) {
      const existingTask = JSON.parse(localStorage.getItem('tasks'))?.find(t => t.id === parseInt(taskId));
      if (existingTask) {
        setTask(existingTask);
      }
    }
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!task.text) errors.text = 'Task title is required';
    if (!task.description) errors.description = 'Task description is required';
    if (!task.category) errors.category = 'Category is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      handleAddOrEditTask(task);
      setIsLoading(false);
      navigate('/');
    }
  };

  const handleBackButton = () => {
    if (task.text || task.description || task.priority || task.category) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (confirmLeave) navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen p-5 flex justify-center items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <div className={`max-w-4xl w-full p-8 bg-white rounded-lg shadow-lg   ${darkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-gray-100 dark:text-black'}`}>
        <h2 className="text-3xl mb-6 text-center font-semibold">
          {taskId ? 'Edit Task' : 'Create New Task'}
        </h2>

        {isLoading && (
          <div className="fixed inset-0 bg-opacity-50 bg-gray-700 flex items-center justify-center z-50">
            <div className="spinner w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div className="flex flex-col">
            <label htmlFor="text" className="mb-2 text-lg">Task Title</label>
            <input
              type="text"
              id="text"
              name="text"
              value={task.text}
              onChange={handleChange}
              placeholder="Task Title"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} ${formErrors.text ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {formErrors.text && <span className="text-red-500 text-sm">{formErrors.text}</span>}
          </div>

          {/* Task Description */}
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 text-lg">Task Description</label>
            <textarea
              id="description"
              name="description"
              rows="2"
              value={task.description}
              onChange={handleChange}
              placeholder="Task Description"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
            />
            {formErrors.description && <span className="text-red-500 text-sm">{formErrors.description}</span>}
          </div>

          {/* Priority */}
          <div className="flex flex-col">
            <label htmlFor="priority" className="mb-2 text-lg">Priority</label>
            <select
              id="priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} ${formErrors.priority ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="category" className="mb-2 text-lg">Category</label>
            <select
              id="category"
              name="category"
              value={task.category}
              onChange={handleChange}
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} ${formErrors.category ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Category</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Home">Home</option>
              <option value="Fitness">Fitness</option>
              <option value="Shopping">Shopping</option>
            </select>
            {formErrors.category && <span className="text-red-500 text-sm">{formErrors.category}</span>}
          </div>

          {/* Submit and Back Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className={`px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              <FaSave className="mr-2" />
              {taskId ? 'Save Changes' : 'Save Task'}
            </button>

            <button
              type="button"
              onClick={handleBackButton}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNote;

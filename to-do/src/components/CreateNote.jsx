import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useParams for getting taskId and useNavigate for redirect

function CreateNote({ handleAddOrEditTask }) {
  const { taskId } = useParams(); // Get taskId from URL if editing
  const navigate = useNavigate();

  const [task, setTask] = useState({
    text: '',
    description: '',
    priority: 'Medium',
    category: '',
  });

  useEffect(() => {
    if (taskId) {
      // If editing, find the task and pre-populate the form
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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddOrEditTask(task);
    navigate('/'); // Redirect to home after saving
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl mb-4">{taskId ? 'Edit Task' : 'Create New Task'}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* Task Title */}
        <div className="flex flex-col">
          <label htmlFor="text" className="mb-2">Task Title</label>
          <input
            type="text"
            id="text"
            name="text"
            value={task.text}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Task Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2">Task Description</label>
          <textarea
            id="description"
            name="description"
            rows="1"
            value={task.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label htmlFor="priority" className="mb-2">Priority</label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2">Category</label>
          <select
            id="category"
            name="category"
            value={task.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Home">Home</option>
            <option value="Fitness">Fitness</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="row float-end">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md me-3">
            {taskId ? 'Save Changes' : 'Save Task'}
          </button>
          {/* Back Button */}
          <button
            type="button" // Avoid form submission
            className="px-4 py-2 bg-gray-600 text-white rounded-md"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateNote;

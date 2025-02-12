import React, { useState, useEffect, useContext } from 'react';
// import { TaskContext } from './TaskContext'; // Import TaskContext
import { useParams } from 'react-router-dom';

function CreateNote({ darkMode }) {
  // const { tasks, handleAddOrEditTask } = useContext(TaskContext); // Access tasks from context
  const [note, setNote] = useState({
    id: "",
    text: "",
    description: "",
    category: "",
    priority: "Low",
    dueDate: ""
  });
  const { taskId } = useParams();

  useEffect(() => {
    if (taskId) {
      const taskToEdit = tasks.find(task => task.id === parseInt(taskId));
      if (taskToEdit) {
        setNote(taskToEdit);
      }
    }
  }, [taskId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddOrEditTask(note); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  return (
    <div className={`min-h-screen p-5 ${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-100 text-black'}`}>
      <h2 className="text-xl font-bold">{taskId ? "Edit Task" : "Create Task"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Form fields */}
        <button type="submit">{taskId ? "Update" : "Add"} Task</button>
      </form>
    </div>
  );
}

export default CreateNote;

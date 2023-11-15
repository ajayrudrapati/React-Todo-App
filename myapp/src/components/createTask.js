import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ updateTaskList, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/tasks/create',
        { title, description },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data.message);
      updateTaskList(); // Trigger the task list update after creating a new task
      setTitle(''); // Clear the form fields
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleCreateTask}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTask;

import React, { useState } from 'react';

const TodoForm = ({ addTodo, username }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      alert('Title is required.');
      return;
    }

    const todo = {
      id: Date.now(), // Using Date.now() as a simple unique identifier
      title,
      description: description || '',
      author: username,
      dateCreated: Date.now(),
      complete: false,
      dateCompleted: null,
    };

    addTodo(todo);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;

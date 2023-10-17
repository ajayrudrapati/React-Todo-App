import React, { useState } from 'react';

const TodoForm = ({ addTodo, username }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

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

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
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

      <ul>
        {todos.map(todo => (
          <div key={todo.id} style={{ marginBottom: '10px' }}>
            <h3>{todo.title}</h3>
            <p>Description: {todo.description || 'N/A'}</p>
            <p>Author: {todo.author}</p>
            <p>Date Created: {new Date(todo.dateCreated).toLocaleString()}</p>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoForm;

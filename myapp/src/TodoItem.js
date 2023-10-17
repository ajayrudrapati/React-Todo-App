import React from 'react';

const TodoItem = ({ todo, onToggleComplete, onDelete }) => {
  const { title, description, author, dateCreated, complete, dateCompleted } = todo;

  const handleCheckboxChange = () => {
    const updatedTodo = {
      ...todo,
      complete: !todo.complete,
      dateCompleted: !todo.complete ? Date.now() : null
    };
    onToggleComplete(updatedTodo);
  };

  const handleDelete = (todoId) => {
      onDelete(todo.id);
    console.log("deleted");
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <h3>{title}</h3>
      <p>Description: {description || 'N/A'}</p>
      <p>Author: {author}</p>
      <p>Date Created: {new Date(dateCreated).toLocaleString()}</p>
      <label>
        Complete:
        <input type="checkbox" checked={complete} onChange={handleCheckboxChange} />
      </label>
      {complete && <p>Date Completed: {new Date(dateCompleted).toLocaleString()}</p>}
      
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;

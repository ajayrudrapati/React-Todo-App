import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete, onDelete }) => {
  const handleDelete = (todoId) => {
    onDelete(todoId);
  };

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={handleDelete}  // Pass handleDelete as a callback
        />
      ))}
    </div>
  );
};

export default TodoList;

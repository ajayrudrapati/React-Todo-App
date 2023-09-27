import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggleComplete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TodoList;

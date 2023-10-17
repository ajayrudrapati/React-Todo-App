import React, { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import Login from './Login';
import Registration from './Registration';
import Logout from './Logout';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState('');

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setLoggedInUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegistration = () => {
    setIsLoggedIn(true);
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleToggleComplete = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
    console.log('Updated todos:', updatedTodos);
  };

  const handleDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
    console.log('Deleted todo with id:', todoId);
  };

  let content;

  if (isLoggedIn) {
    content = (
      <div>
        <Logout handleLogout={handleLogout} />
        <TodoForm addTodo={addTodo} username={loggedInUsername} />
        <TodoList todos={todos} onToggleComplete={handleToggleComplete} onDelete={handleDelete} />
      </div>
    );
  } else {
    content = (
      <div>
        <Login handleLogin={handleLogin} />
        <Registration handleRegistration={handleRegistration} />
      </div>
    );
  }

  return <div>{content}</div>;
};

export default App;

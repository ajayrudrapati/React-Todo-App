import React, {useEffect,useState } from 'react';
import axios from 'axios';


const TodoForm = ({ addTodo, username }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    // Fetch todos from the API when the component mounts
    axios.get('http://localhost:3001/todo')  // Replace with your API endpoint
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

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
<h2>Mock API Todo List</h2>
      <ul>
        {todos.map(todo => (
          <div key={todo.id} >
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

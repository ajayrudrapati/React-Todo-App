import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Register from './Register';

const Login = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  sessionStorage.clear()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      const { token } = response.data;
      // Save the token to localStorage or a state management solution
      console.log('Login successful. Token:', token);
      sessionStorage.setItem("token",token)
      onLogin();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <Register/>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {/* Link to the registration page */}
      {/* <p>
        Don't have an account? <Link to="/Register">Register</Link>
      </p> */}
    </div>
  );
};

export default Login;

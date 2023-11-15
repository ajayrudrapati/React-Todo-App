import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/Tasks';

const App = () => {
  const [isloggedin, setLogin] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const setLoginTrue = () => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken);
    setLogin(true);
    navigate('/Tasks');
  };

  useEffect(() => {
    // Check if the user is logged in (after the page loads)
    // If they're not, redirect them to the homepage
    if (!isloggedin && window.location.pathname !== '/') {
      navigate('/');
    }
  }, [isloggedin, navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    setLogin(false);
    navigate('/');
  };

  return (
    <div>
      {isloggedin && <button onClick={handleLogout}>Logout</button>}
      <Routes>
        <Route path="/" element={<Login onLogin={setLoginTrue} />} />
        <Route path="/Register" element={<Register />} />
        {isloggedin && <Route path="/Tasks" element={<TaskList />} />}
      </Routes>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateTask from './createTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: {
            Authorization: token,
          },
        });

        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [token]);
  

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/tasks/${taskId}/complete`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );

      console.log(response.data.message);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/delete/${taskId}`, {
        headers: {
          Authorization: token,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));

      console.log(response.data.message);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskList = async () => {
    // Update the task list
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: token,
        },
      });

      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };

  return (
    <div>
        <CreateTask updateTaskList={updateTaskList} token={token} />
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>
            <p>{task.description}</p>
            <p>completed at: {task.completed ? task.completedAt : ''}</p>
            <p>created at: {task.createdAt}</p>
            <>
            {task.completed ? (
              <p>Completed</p>
            ) : (
              <>
                <button onClick={() => handleCompleteTask(task._id)}>
                  Mark Complete
                </button>
              </>
            )}


                
            <button onClick={() => handleDeleteTask(task._id)}>
                  Delete
            </button>
            </>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

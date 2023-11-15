// ApiService.js

import axios from 'axios';

export const apiUrl = 'http://localhost:5000/api';

const ApiService = {
  login: async (username, password) => {
    
  },

  register: async (username, password) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, { username, password });

      return response.data.message; // You might want to return something meaningful from the registration endpoint
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response from the server');
      } else {
        throw new Error('Request failed');
      }
    }
  },

  getTasks: async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data.tasks;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response from the server');
      } else {
        throw new Error('Request failed');
      }
    }
  },

  markTaskAsComplete: async (taskId, token) => {
    try {
      const response = await axios.patch(`${apiUrl}/tasks/${taskId}/complete`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data.task;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else if (error.request) {
        throw new Error('No response from the server');
      } else {
        throw new Error('Request failed');
      }
    }
  },

  // Add more Axios-based API methods as needed
};

export default ApiService;

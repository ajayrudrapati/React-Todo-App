// mongoRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming you have a User model
const Task = require('./models/Task');
const Login = require('./models/Login');
const secret_key = "2345^%^&*HYTDFGYH"
// Sample route for user registration

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash and salt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ username });

    // If the user does not exist, or the password is incorrect, return an error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a new login record
    // const newLogin = new Login({ username, password });
    // await newLogin.save();

    // Generate a JWT token
    const token = jwt.sign({ username }, secret_key, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/tasks', authenticateToken, async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();

    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/tasks/create', authenticateToken, async (req, res) => {
  const { title, description,author } = req.body;
  const createdAt = new Date();

  try {
    // Create a new task
    const newTask = new Task({ title, description,createdAt,author});
    await newTask.save();

    res.status(201).json({ message: 'Task saved successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to delete a task
router.delete('/tasks/delete/:taskId', authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Find and delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully', task: deletedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to mark a task as complete
router.patch('/tasks/:taskId/complete', authenticateToken, async (req, res) => {
  const taskId = req.params.taskId;

  try {
    // Find and update the task by ID
    const completedTime = new Date(); // Get the current timestamp

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: true, completedAt: completedTime },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task marked as complete', task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: err });
    }

    req.user = user;
    next();
  });
}

// Other MongoDB routes...

module.exports = router;

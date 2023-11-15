// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  auhtor:{type:String},
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }, // New field to store completion time
  createdAt: { type: Date, default: null }, // New field to store completion time
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;

// Routes

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST create a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = { id: idCounter++, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT mark task as done
app.put('/tasks/:id/done', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.done = true;
  res.json(task);
});

// DELETE remove task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

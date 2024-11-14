const express = require('express');
const router = express.Router();
const todos = require('../models/todo');

// POST /todos - Create a new to-do
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const newTodo = { id: todos.length + 1, title, description, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos - Retrieve all to-dos
router.get('/', (req, res) => {
    res.status(200).json(todos);
});

// GET /todos/:id - Retrieve a specific to-do by ID
router.get('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "To-do not found" });
    }
    res.status(200).json(todo);
});

// PUT /todos/:id - Update a specific to-do by ID
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) {
        return res.status(404).json({ error: "To-do not found" });
    }
    const { title, description, completed } = req.body;
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    res.status(200).json(todo);
});

// DELETE /todos/:id - Delete a specific to-do by ID
router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ error: "To-do not found" });
    }
    todos.splice(index, 1);
    res.status(200).json({ message: "To-do item deleted successfully" });
});

module.exports = router;

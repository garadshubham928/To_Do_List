const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Import to-do routes
const todoRoutes = require('./routes/todos');
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

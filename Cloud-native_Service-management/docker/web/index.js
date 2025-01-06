const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database Connection
// Create connection pool instead of single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'userdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the User API!');
});

// Get all users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) 
      throw err;
    res.json(results);
  });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) 
      throw err;
    res.json(result[0]);
  });
});

// Create new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, name, email });
  });
});

// Update user by ID
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User updated successfully' });
  });
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

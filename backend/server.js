const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


// Dummy user data for demo purposes
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' },
  { id: 2, username: 'user2', password: 'password2', role: 'admin' }
];

// Secret key for JWT encryption
const secretKey = 'mysecretkey';

// Route for user registration
app.post('/register', (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Check if username already exists
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already taken' });
  }

  // Create new user object and add to user array
  const newUser = { id: users.length + 1, username, password, role: 'user' };
  users.push(newUser);

  // Generate JWT token for new user and send back in response
  const token = jwt.sign({ id: newUser.id, role: newUser.role }, secretKey);
  res.status(201).json({ token });
});

// Route for user login and authentication
app.post('/login', (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;
  console.log('user: '+ username);
  // Find user with matching username and password
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  // Generate JWT token for authenticated user and send back in response
  const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
  res.json({ token });
  //res.json({ 'username': username,'password': password });
  //res.redirect('/wallet');
  //res.sendFile("C:/Users/DEHK/Documents/myapp/page.html");

});

// Middleware for user authentication and authorization
const authenticateUser = (req, res, next) => {
  // Extract token from authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1];

  // Verify token and extract user ID and role
  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = { id: decodedToken.id, role: decodedToken.role };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Route for getting user's wallet data (requires authentication and "user" role)
app.get('/wallet', authenticateUser, (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied' });
  }


  // Retrieve wallet data for authenticated user and send back in response
  // ...
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});










/*




const express = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydatabase',
  password: 'mypassword',
  port: 5432,
});

const app = express();
app.use(express.json());

// Add a new item to the database
app.post('/items', async (req, res) => {
  try {
    const { name, description } = req.body;
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING id',
      [name, description]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Delete an item from the database
app.delete('/items/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM items WHERE id = $1',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Item not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
*/
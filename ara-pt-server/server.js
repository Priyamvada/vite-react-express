const express = require('express');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173', // React dev server origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: username }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'public')));

// The "catchall" handler: for any request that doesn't
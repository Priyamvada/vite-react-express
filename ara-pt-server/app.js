const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./models');
// db.sequelize.sync({ force: true });

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // React dev server origin
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

// app.post('/api/login', async (req, res) => {
//   console.log('Login attempt:', req.body);
//   const { username, password } = req.body;

//   try {
//     await db.sequelize.authenticate();
//     console.log('Connection has been established successfully.');

//     const users = await db.User.findAll();
//     console.log('All users:', JSON.stringify(users, null, 2));
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   } finally {
//     await db.sequelize.close();
//   }

//   const user = null;
//   // const user = users.find(u => u.username === username);

//   if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials.' });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials.' });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ username: username }, 'your_jwt_secret', { expiresIn: '1h' });
//   res.json({ message: 'Login successful', token });
// });
require('./routes/auth.routes')(app);
require('./routes/invoice.routes')(app);

module.exports = app;
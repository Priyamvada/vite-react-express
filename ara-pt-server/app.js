const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// db.sequelize.sync({ force: true });

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // React dev server origin
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

require('./routes/auth.routes')(app);
require('./routes/invoice.routes')(app);

module.exports = app;
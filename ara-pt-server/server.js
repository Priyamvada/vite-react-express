const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// const bcrypt = require('bcryptjs');
// const path = require('path');

const app = require('./app');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'public')));

// The "catchall" handler: for any request that doesn't
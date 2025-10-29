const { login, logout, signup } = require('../controllers/auth.controller');

module.exports = function(app) {
  app.post('/api/login', login);
  app.get('/api/logout', logout);
  app.post('/api/signup', signup);
};
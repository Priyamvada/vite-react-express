const { login, signup } = require('../controllers/auth.controllers');

module.exports = function(app) {
  app.post('/api/login', login);
  app.post('/api/signup', signup);
};
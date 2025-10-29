const { login, signup } = require('../controllers/auth.controller');

module.exports = function(app) {
  app.post('/api/login', login);
  app.post('/api/signup', signup);
};
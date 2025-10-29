const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

exports.comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

exports.generateToken = (user) => {
  console.log('Generating token for user:', user.username, process.env.JWT_SECRET);
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  });
};
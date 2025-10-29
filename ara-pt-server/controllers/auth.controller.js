const db = require('../models');
const User = db.User;
const authUtils = require('../utils/auth.utils');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    res.status(201).send({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = await authUtils.comparePassword(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
    }

    const token = authUtils.generateToken(user);

    res.cookie('access_token', token, {
        httpOnly: true, // Prevents client-side JavaScript access
        secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
        sameSite: 'Lax', // Or 'Strict' for stricter CSRF protection
        maxAge: 86400000 // Cookie expiration in milliseconds (1 day in this example)
    });
    res.cookie('username', user.username, {
        httpOnly: false, // Allow client-side JavaScript access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        maxAge: 86400000
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('access_token', { httpOnly: true , secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
  res.clearCookie('username', { httpOnly: false , secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' });
  res.status(200).send({ message: 'User logged out successfully!' });
};
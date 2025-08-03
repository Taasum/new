const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simulated user database (in-memory)
const users = [];

// Secret key (ideally should be stored in .env)
const SECRET_KEY = 'zentara_secret_key';

// ✅ Register Route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10); // 🔐 Hash the password
  users.push({ email, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
});

// ✅ Login Route with JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // ✅ Generate JWT Token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '2h' });

  res.status(200).json({ message: 'Login successful', token });
});

module.exports = router;

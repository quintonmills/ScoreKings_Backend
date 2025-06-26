// authRoutes.js
const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// Email/Password Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.loginWithEmail(email, password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Social Login Endpoints
router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;
    const authToken = await authService.verifyGoogleToken(token);
    res.json({ token: authToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/facebook', async (req, res) => {
  try {
    const { token } = req.body;
    const authToken = await authService.verifyFacebookToken(token);
    res.json({ token: authToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/apple', async (req, res) => {
  try {
    const { token, fullName } = req.body;
    const authToken = await authService.verifyAppleToken(token, fullName);
    res.json({ token: authToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
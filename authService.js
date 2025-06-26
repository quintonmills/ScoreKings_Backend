// authService.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const Facebook = require('fb');
const appleSignin = require('apple-signin-auth');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Email/Password Auth
const loginWithEmail = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  
  return generateToken(user._id);
};

// Google Auth
const verifyGoogleToken = async (token) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  
  let user = await User.findOne({ googleId: payload.sub });
  if (!user) {
    user = new User({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture
    });
    await user.save();
  }
  
  return generateToken(user._id);
};

// Facebook Auth
const verifyFacebookToken = async (token) => {
  Facebook.setAccessToken(token);
  const res = await Facebook.api('/me', { fields: 'id,name,email,picture' });
  
  let user = await User.findOne({ facebookId: res.id });
  if (!user) {
    user = new User({
      facebookId: res.id,
      email: res.email,
      name: res.name,
      avatar: res.picture?.data?.url
    });
    await user.save();
  }
  
  return generateToken(user._id);
};

// Apple Auth
const verifyAppleToken = async (token, fullName) => {
  const { sub: appleId, email } = await appleSignin.verifyIdToken(token, {
    audience: process.env.APPLE_CLIENT_ID,
    ignoreExpiration: true,
  });
  
  let user = await User.findOne({ appleId });
  if (!user) {
    user = new User({
      appleId,
      email,
      name: fullName ? `${fullName.givenName} ${fullName.familyName}` : 'Apple User'
    });
    await user.save();
  }
  
  return generateToken(user._id);
};

module.exports = {
  loginWithEmail,
  verifyGoogleToken,
  verifyFacebookToken,
  verifyAppleToken
};
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { username, mobile, password } = req.body;

    // Validate input
    if (
      typeof username !== 'string' ||
      typeof mobile !== 'string' ||
      typeof password !== 'string' ||
      !username.trim() ||
      !mobile.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Please provide username, mobile and password.',
      });
    }

    if (!/^\d{10}$/.test(mobile.trim())) {
      return res.status(400).json({
        message: 'Mobile number must contain exactly 10 digits.',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters.',
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      mobile: mobile.trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        message: 'This mobile number is already registered.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save user to MongoDB
    const user = await User.create({
      username: username.trim(),
      mobile: mobile.trim(),
      password: hashedPassword,
    });

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing from environment variables.');
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Registration successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'This mobile number is already registered.',
      });
    }

    console.error('Signup error:', error.message);

    return res.status(500).json({
      message: 'Server error during registration.',
    });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (
      typeof mobile !== 'string' ||
      typeof password !== 'string' ||
      !mobile.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: 'Please enter your mobile number and password.',
      });
    }

    // Find user
    const user = await User.findOne({
      mobile: mobile.trim(),
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid mobile number or password.',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid mobile number or password.',
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing from environment variables.');
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        username: user.username,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);

    return res.status(500).json({
      message: 'Server error during login.',
    });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authentication token required.',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is missing from environment variables.');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token stores the user ID in userId
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    // Never return the password
    return res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        mobile: user.mobile,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error.message);

    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
};

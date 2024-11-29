const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {deleteUserContacts} = require('./contactControllers');

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '2h' });
};

// User registration
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            role,
            password: hashedPassword,
        });

        const accessToken = createAccessToken({ id:newUser._id, email });

        res.status(201).json({
            message: 'User registered successfully',
            accessToken: accessToken,
            role: newUser.role,
            userName: newUser.name
        });
    } catch (error) {
        res.status(500).json({ error: 'User already exists or server error' });
    }
};

// User login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User does not exist' });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ error: 'Incorrect password' });

        const accessToken = createAccessToken({ id: user._id, email: user.email });

        res.status(201).json({
            message: 'User registered successfully',
            accessToken: accessToken,
            role: user.role,
            userName: user.name});
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user profile (admin only)
const updateProfile = async (req, res) => {
    const { email, name } = req.body;
    
    if (!email || !name) {
        return res.status(400).json({ error: 'Please provide email and name' });
    }

    try {
        const user = await User.findOneAndUpdate(
            { email },
            { name },
            { new: true } 
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({
            message: 'User profile updated successfully',
            user: userWithoutPassword,
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update user profile' });
    }
};


// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

const deleteProfile = async (req, res) => {
  const email = req.body.email;

  try {
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await deleteUserContacts(user._id);

    await User.deleteOne({ email });

    res.status(200).json({ message: "User and associated contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user and contacts" });
  }
};

module.exports = {
    register,
    login,
    updateProfile,
    getAllUsers,
    deleteProfile
};

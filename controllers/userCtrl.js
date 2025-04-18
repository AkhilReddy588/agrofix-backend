const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const newUser = await User.create({
    email,
    password,
    role: role || 'user',
  })

  res.status(201).json({
    _id: newUser._id,
    email: newUser.email,
  })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  const user = await User.findOne({ email });
  console.log(email)
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  if (role && user.role !== role) {
    return res.status(403).json({ message: 'Access denied. Not an admin user.' });
  }

  res.json({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
    message: 'Login successful',
  });
});



const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  await user.remove()

  res.json({ message: 'User removed successfully' })
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password') // exclude passwords
  res.json(users)
})

const updateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findById(req.params.id)

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  user.email = email || user.email
  if (password) {
    user.password = password
  }

  const updatedUser = await user.save()

  res.json({
    _id: updatedUser._id,
    email: updatedUser.email,
    message: 'User updated successfully'
  })
})

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
}

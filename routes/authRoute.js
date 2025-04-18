const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
  updateUser
} = require('../controllers/userCtrl')

const { protect, adminOnly } = require('../middlewares/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/', getAllUsers)
router.delete('/:id', protect, adminOnly, deleteUser)
router.put('/:id', protect, adminOnly, updateUser)

module.exports = router

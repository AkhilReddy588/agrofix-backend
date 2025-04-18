const express = require('express')
const router = express.Router()
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productCtrl')

const { protect, adminOnly } = require('../middlewares/authMiddleware')

// Public route
router.get('/', getProducts)

// Admin-only routes
router.post('/', protect, adminOnly, addProduct)
router.put('/:id', protect, adminOnly, updateProduct)
router.delete('/:id', protect, adminOnly, deleteProduct)

module.exports = router

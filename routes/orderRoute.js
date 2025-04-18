const express = require('express')
const router = express.Router()
const {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getOrdersByUserId
} = require('../controllers/orderCtrl')

const { protect, adminOnly } = require('../middlewares/authMiddleware')

router.post('/', protect, placeOrder)
router.get('/my-orders', protect, getOrdersByUserId)
router.get('/', protect, adminOnly, getAllOrders)
router.put('/:id', protect, adminOnly, updateOrderStatus)

module.exports = router

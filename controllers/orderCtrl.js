const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const Product = require('../models/productModel')

const placeOrder = asyncHandler(async (req, res) => {
  const { items, address } = req.body

  console.log(address)

  if (!address) {
    res.status(400);
    throw new Error('Address is required');
  }

  if (!items || items.length === 0) {
    res.status(400)
    throw new Error('No order items provided')
  }

  // Validate all products exist
  for (const item of items) {
    const product = await Product.findById(item.product)
    if (!product) {
      res.status(404)
      throw new Error(`Product not found: ${item.product}`)
    }
  }

  // Create order if all products are valid
  const newOrder = await Order.create({
    user: req.user._id,
    items,
    address
  })

  res.status(201).json(newOrder)
})

const getOrdersByUserId = asyncHandler(async (req, res) => {
  const userId = req.user._id

  const orders = await Order.find({ user: userId }).populate('items.product', 'name price')

  if (!orders || orders.length === 0) {
    res.status(404)
    throw new Error('No orders found for this user')
  }

  res.json(orders)
})


const getAllOrders = asyncHandler(async (req, res) => {
  // Populate all fields of the product in items and user email
  const orders = await Order.find()
    .populate('user', 'email')  // Populating user with only the email field
    .populate('items.product')  // Populating entire product object in the items array
  res.json(orders)
})


const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  // Ensure status is a valid option
  if (!['pending', 'In Progress', 'Delivered'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Update order status
  order.status = status || order.status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});


module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getOrdersByUserId
}

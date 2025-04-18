const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

const addProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body

  if (!name || price == null) {
    res.status(400)
    throw new Error('Name and price are required')
  }

  const newProduct = await Product.create({ name, price })
  res.status(201).json(newProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price } = req.body

  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  product.name = name || product.name
  product.price = price !== undefined ? price : product.price

  const updatedProduct = await product.save()
  res.json(updatedProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(404)
    throw new Error('Product not found')
  }

  await Product.deleteOne({ _id: product._id })
  res.json({ message: 'Product deleted successfully' })
})

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
}

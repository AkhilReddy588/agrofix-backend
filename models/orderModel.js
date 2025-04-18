const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'In Progress', 'Delivered'],
      default: 'pending',
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)

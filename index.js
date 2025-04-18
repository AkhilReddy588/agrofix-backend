const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors') 
const dbConnect = require('./config/dbConnect')
const authRoute = require('./routes/authRoute')
const productRoutes = require('./routes/productRoute')
const orderRoutes = require('./routes/orderRoute')
const serverless = require('serverless-http');

const app = express()
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3002', 'https://agrofix-user-frontend.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

dbConnect()

app.use('/api/users', authRoute)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})

module.exports = app;
module.exports.handler = serverless(app);
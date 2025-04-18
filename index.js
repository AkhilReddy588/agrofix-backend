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
app.use(cors())

dbConnect()

app.use('/api/users', authRoute)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});

module.exports.handler = serverless(app)
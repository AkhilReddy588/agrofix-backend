# 🛒 AgroFix Backend

This is the **Express.js backend** for the AgroFix e-commerce application. It provides RESTful APIs for managing users, products, and orders.

---

## 🚀 Tech Stack

- **Backend Framework:** Express.js  
- **Database:** MongoDB (via Mongoose)  
- **Auth:** JWT-based authentication  
- **Deployment:** Vercel (serverless) / Render (Node server)  
- **Environment Config:** dotenv  
- **CORS:** Configured for local development and frontend deployment

---

## 📁 Project Structure

. ├── config/ │ └── dbConnect.js # MongoDB connection setup ├── controllers/ # Business logic ├── middlewares/ # Auth, error handling, etc. ├── models/ # Mongoose schemas ├── routes/ # Express routes │ ├── authRoute.js │ ├── productRoute.js │ └── orderRoute.js ├── index.js # Entry point ├── package.json └── .env # Environment variables


---

## ⚙️ Getting Started (Local Development)

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/agrofix-backend.git
cd agrofix-backend

PORT=3000
MONGO_URL=your-mongodb-uri
JWT_SECRET=your-jwt-secret

🌐 API Endpoints
User Routes

Method	Endpoint	Description
POST	/api/users/register	Register a user
POST	/api/users/login	Login a user
Product Routes

Method	Endpoint	Description
GET	/api/products	Get all products
POST	/api/products	Create a product
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product
Order Routes

Method	Endpoint	Description
POST	/api/orders	Create an order
GET	/api/orders	List all orders


# 📚 BookNest - Online Book Marketplace

A full-stack MERN application for buying and selling books online. BookNest connects book sellers with readers, providing a seamless platform for book transactions with features like wishlist management, order tracking, and admin controls.

## ✨ Features

### 👤 User Features
- **Browse Books**: View all available books with details (title, author, genre, price)
- **Buy Now**: Direct purchase with order form and delivery address
- **Wishlist**: Save favorite books for later
- **Order Tracking**: View order history with booking and delivery dates
- **Order Status**: Real-time order status (On the way / Delivered)
- **User Authentication**: Secure signup and login

### 👨‍💼 Seller Features
- **Add Books**: Upload books with images, descriptions, and pricing
- **Manage Products**: View and delete your listed books
- **Order Management**: Track orders for your books
- **Seller Dashboard**: Overview of all your products and sales

### 🔐 Admin Features
- **User Management**: View and manage registered users
- **Seller Management**: Monitor and control seller accounts
- **Book Management**: Oversee all books listed on the platform
- **Complete Control**: Delete users, sellers, or inappropriate listings

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Bootstrap** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/dlashyakumari/BookNest.git
cd BookNest
```

### Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory (optional, or configure in `db/config.js`):
```env
MONGODB_URI=your_mongodb_connection_string
PORT=4000
```

Start the backend server:
```bash
node server.js
```
Server runs on `http://localhost:4000`

### Frontend Setup
```bash
cd Frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```
Frontend runs on `http://localhost:5173`

## 🚀 Usage

### For Users
1. **Sign Up**: Create an account as a user
2. **Browse Books**: Explore the product catalog
3. **Add to Wishlist**: Save books you're interested in
4. **Buy Now**: Click "Buy Now" to place an order
5. **Track Orders**: View your orders in "My Orders" section

### For Sellers
1. **Sign Up**: Register as a seller
2. **Add Books**: Upload books with details and images
3. **Manage Products**: View and edit your listings
4. **View Orders**: Check orders for your books

### For Admins
1. **Admin Login**: Access admin panel
2. **Manage Users**: View/delete user accounts
3. **Manage Sellers**: Monitor seller activities
4. **Manage Books**: Oversee all listings

## 📁 Project Structure

```
BookNest/
├── Backend/
│   ├── db/
│   │   ├── config.js           # Database configuration
│   │   ├── Admin/              # Admin schemas
│   │   ├── Seller/             # Seller & book schemas
│   │   └── Users/              # User, order, wishlist schemas
│   ├── uploads/                # Book images storage
│   ├── server.js               # Main server file
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── Admin/              # Admin components
│   │   ├── Seller/             # Seller components
│   │   ├── User/               # User components
│   │   ├── Components/         # Shared components
│   │   ├── App.jsx             # Main app component
│   │   └── main.jsx            # Entry point
│   ├── public/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔑 API Endpoints

### User Routes
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /users` - Get all users (admin)
- `DELETE /userdelete/:id` - Delete user

### Seller Routes
- `POST /ssignup` - Seller registration
- `POST /slogin` - Seller login
- `GET /sellers` - Get all sellers
- `DELETE /sellerdelete/:id` - Delete seller

### Book/Item Routes
- `POST /items` - Add new book (with image upload)
- `GET /item` - Get all books
- `GET /item/:id` - Get single book
- `GET /getitem/:userId` - Get books by seller
- `DELETE /itemdelete/:id` - Delete book

### Order Routes
- `POST /userorder` - Place order
- `GET /getorders/:userId` - Get orders by user
- `GET /getsellerorders/:sellerId` - Get orders by seller
- `GET /orders` - Get all orders (admin)
- `DELETE /userorderdelete/:id` - Delete order

### Wishlist Routes
- `POST /wishlist/add` - Add to wishlist
- `GET /wishlist/:userId` - Get user wishlist
- `POST /wishlist/remove` - Remove from wishlist

## 🎨 Key Features Implemented

### Recent Updates
- ✅ **Buy Now Button**: Added direct purchase option on product listing
- ✅ **Order Form**: Comprehensive order form with delivery address
- ✅ **Order Tracking**: View booking and expected delivery dates
- ✅ **Wishlist Management**: Add/remove books from wishlist
- ✅ **Image Upload**: Multer integration for book images
- ✅ **Secure Authentication**: Bcrypt password hashing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Lashya Kumari**
- GitHub: [@dlashyakumari](https://github.com/dlashyakumari)

## 🙏 Acknowledgments

- Bootstrap for UI components
- MongoDB for database
- React community for amazing tools and libraries

---

⭐ Star this repository if you find it helpful!

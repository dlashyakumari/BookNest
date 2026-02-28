const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const connectDB = require('./db/config');


const User = require('./db/Users/userschema');
const Seller = require('./db/Seller/Sellers');
const Admin = require('./db/Admin/Admin');
const Book = require('./db/Seller/Additem');
const MyOrders = require('./db/Users/myorders');
const Wishlist = require('./db/Users/Wishlist');


const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));


app.use('/uploads', express.static('uploads'));


const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });




// ─────────────────────────────────────────────
//  USER ROUTES
// ─────────────────────────────────────────────


// User Signup
app.post('/signup', async (req, res) => {
    try {
        console.log('Signup request received:', req.body);
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();
        res.status(201).json({ message: 'Account created', user });
    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).json({ error: err.message });
    }
});


// User Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.json({ Status: 'Failed', message: 'User not found' });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ Status: 'Failed', message: 'Invalid password' });
        res.json({ Status: 'Success', user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// ─────────────────────────────────────────────
//  SELLER ROUTES
// ─────────────────────────────────────────────


// Seller Signup
app.post('/ssignup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await Seller.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });
        const hashed = await bcrypt.hash(password, 10);
        const seller = new Seller({ name, email, password: hashed });
        await seller.save();
        res.status(201).json({ message: 'Account created', seller });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Seller Login
app.post('/slogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const seller = await Seller.findOne({ email });
        if (!seller) return res.json({ Status: 'Failed', message: 'Seller not found' });
        const match = await bcrypt.compare(password, seller.password);
        if (!match) return res.json({ Status: 'Failed', message: 'Invalid password' });
        res.json({ Status: 'Success', user: { id: seller._id, name: seller.name, email: seller.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// ─────────────────────────────────────────────
//  ADMIN ROUTES
// ─────────────────────────────────────────────


// Admin Signup
app.post('/asignup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await Admin.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already registered' });
        const hashed = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, password: hashed });
        await admin.save();
        res.status(201).json({ message: 'Account created', admin });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Admin Login
app.post('/alogin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.json({ Status: 'Failed', message: 'Admin not found' });
        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.json({ Status: 'Failed', message: 'Invalid password' });
        res.json({ Status: 'Success', user: { id: admin._id, name: admin.name, email: admin.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all sellers
app.get('/sellers', async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json(sellers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete user
app.delete('/userdelete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete seller
app.delete('/sellerdelete/:id', async (req, res) => {
    try {
        await Seller.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Seller deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// ─────────────────────────────────────────────
//  BOOK / ITEM ROUTES
// ─────────────────────────────────────────────


// Add a book
app.post('/items', upload.single('itemImage'), async (req, res) => {
    try {
        const { title, author, genre, description, price, userId, userName } = req.body;
        const itemImage = req.file ? req.file.path : '';
        const book = new Book({ title, author, genre, description, price, userId, userName, itemImage });
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Get all books
app.get('/item', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get single book by id
app.get('/item/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get books by seller
app.get('/getitem/:userId', async (req, res) => {
    try {
        const books = await Book.find({ userId: req.params.userId });
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete a book
app.delete('/itemdelete/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Admin delete any book
app.delete('/useritemdelete/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// ─────────────────────────────────────────────
//  ORDER ROUTES
// ─────────────────────────────────────────────


// Place an order
app.post('/userorder', async (req, res) => {
    try {
        const order = new MyOrders(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Get orders by user
app.get('/getorders/:userId', async (req, res) => {
    try {
        const orders = await MyOrders.find({ userId: req.params.userId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get orders by seller
app.get('/getsellerorders/:sellerId', async (req, res) => {
    try {
        const orders = await MyOrders.find({ sellerId: req.params.sellerId });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get all orders (admin)
app.get('/orders', async (req, res) => {
    try {
        const orders = await MyOrders.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Delete an order
app.delete('/userorderdelete/:id', async (req, res) => {
    try {
        await MyOrders.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// ─────────────────────────────────────────────
//  WISHLIST ROUTES
// ─────────────────────────────────────────────


// Add to wishlist
app.post('/wishlist/add', async (req, res) => {
    try {
        const item = new Wishlist(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Get wishlist by user
app.get('/wishlist/:userId', async (req, res) => {
    try {
        const items = await Wishlist.find({ userId: req.params.userId });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Remove from wishlist
app.post('/wishlist/remove', async (req, res) => {
    try {
        const { itemId } = req.body;
        await Wishlist.findByIdAndDelete(itemId);
        res.status(200).json({ message: 'Removed from wishlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ─────────────────────────────────────────────
//  START SERVER
// ─────────────────────────────────────────────
const startServer = async () => {
    try {
        await connectDB();
        app.listen(4000, () => {
            console.log('BookNest server running on port 4000');
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();


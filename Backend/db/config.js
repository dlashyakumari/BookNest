const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sunil93021:Sunil%402005@cluster0.iy8qmcq.mongodb.net/?appName=Cluster0');
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
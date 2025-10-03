const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productsdb';

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB via Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

module.exports = { connect, mongoose };

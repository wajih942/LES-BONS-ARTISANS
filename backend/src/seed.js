// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Product = require('./models/Product');

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/productsdb',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Connected to MongoDB ✅');

    // Clear collections
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Old data removed ✅');

    // Create users
    const salt = await bcrypt.genSalt(10);

    const user1 = new User({
      email: 'user1@example.com',
      password: await bcrypt.hash('P@ssword123', salt),
      name: 'Alice',
    });

    const user2 = new User({
      email: 'user2@example.com',
      password: await bcrypt.hash('P@ssword456', salt),
      name: 'Bob',
    });

    await user1.save();
    await user2.save();

    console.log('Users created ✅');

    // Create products
    const products = [
      {
        name: 'Laptop Pro',
        type: 'Electronics',
        price: 1200,
        rating: 5,
        warranty_years: 2,
        available: true,
        user: user1._id,
      },
      {
        name: 'Smartphone X',
        type: 'Electronics',
        price: 900,
        rating: 4,
        warranty_years: 1,
        available: true,
        user: user1._id,
      },
      {
        name: 'Gaming Console',
        type: 'Electronics',
        price: 500,
        rating: 4,
        warranty_years: 3,
        available: true,
        user: user2._id,
      },
      {
        name: 'Wireless Headphones',
        type: 'Accessories',
        price: 200,
        rating: 5,
        warranty_years: 1,
        available: true,
        user: user2._id,
      },
    ];

    await Product.insertMany(products);
    console.log('Products created ✅');

    console.log('🌱 Database seeding completed successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seed();

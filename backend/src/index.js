const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./db');
const productsRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const { initSocket } = require('./utils/socket');

const PORT = process.env.PORT || 3000;

async function start() {
  await db.connect();

  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);        // register/login
  app.use('/api/products', productsRoutes); // CRUD products (protected)

//   // Health check
//   app.get('/health', (req, res) => res.json({ ok: true }));

  // Create HTTP server and attach Socket.IO
  const server = http.createServer(app);
  initSocket(server);

  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

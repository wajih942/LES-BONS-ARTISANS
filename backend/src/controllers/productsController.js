const Product = require('../models/Product');
const { getIO } = require('../utils/socket');

async function listProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getMyProducts(req, res) {
  try {
    const userId = req.user.userId;
    const products = await Product.find({ user: userId });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}


async function getProduct(req, res) {
  try {
    const id = req.params.id;
    console.log("req",req.params.id)
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createProduct(req, res) {
  try {
    const data = req.body;
    console.log("req.user.userId",req.user.userId)
    data.user = req.user.userId;
    const product = new Product(data);
    await product.save();

    getIO().emit("productCreated", product);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.userId;

    // Find product and check ownership
    const product = await Product.findOne({ _id: id, user: userId });
    if (!product) return res.status(403).json({ message: 'Non autorisé ou produit non trouvé' });

    // Update only if owned by the user
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    getIO().emit("productUpdated", updated);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const userId = req.user.userId;

    // Delete only if owned by the user
    const product = await Product.findOneAndDelete({ _id: id, user: userId });
    if (!product) return res.status(403).json({ message: 'Non autorisé ou produit non trouvé' });
    getIO().emit("productDeleted", { id: product._id });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
};
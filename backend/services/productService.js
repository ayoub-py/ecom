const Product = require('../models/product');

const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }
};

// Add functions for createProduct, updateProduct, and deleteProduct

module.exports = {
  getProducts,
  getProductById
};

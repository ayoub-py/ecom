const Product = require('../models/product');



const createProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const getProducts = async () => {
  try {
    const products = await Product.find().select('name').populate('category');
    return products;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId).select('-_id -images -image -richDescription').populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (productId, productData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId) => {
  try {
    await Product.findByIdAndDelete(productId);
  } catch (error) {
    throw error;
  }
};

const getProductsCount = async()=>{
  try{
   const result = await Product.countDocuments();
   return result;
  }catch(error){
    throw error;
  }
}

const getFeaturedProducts = async()=>{
  try{
   const result = await Product.find({'isFeatured':true});
   return result;
  }catch(error){
    throw error;
  }
}
const getProductByCategory = async(filter)=>{
  try{
    const result = await Product.find({'category':filter}).select('name price');
    return result;
   }catch(error){
     throw error;
   }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsCount,
  getFeaturedProducts,
  getProductByCategory
};

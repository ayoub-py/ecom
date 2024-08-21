const productService = require('../services/productService');


const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let filter = [];
    const q = req.query.categories;
    if(q){
      filter = q.split(',');
      console.log(filter)
      const result = await productService.getProductByCategory(filter);
      res.json(result)
    }else{
    const products = await productService.getProducts();
    res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProductsCount = async (req,res)=>{
  try{
    const result = await productService.getProductsCount();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getFeaturedProducts = async (req,res)=>{
  try{
    const result = await productService.getFeaturedProducts();
    res.json(result)
  }catch(error){
    res.status(500).json({message: error.message})
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
};

const Category = require('../models/category');

const createCategory = async (categoryData) => {
  try {
    const newCategory = await Category.create(categoryData);
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const getCategories = async () => {
  try {
    const categories = await Category.find().populate('products');
    return categories;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (categoryId, categoryData) => {
    try {
      const category = await Category.findById(categoryId);
      if (!category) {
        throw new Error('Category not found');
      }
  
      // Handle basic field updates
      if (categoryData.name) category.name = categoryData.name;
      if (categoryData.image) category.image = categoryData.image;
      // Add other field updates here as needed
  
      // Handle product updates
      if (categoryData.products) {
        categoryData.products.forEach(productId => {
          if (!category.products.includes(productId)) {
            console.log('product will be added', productId, 'list was',category.products)
            category.products.push(productId);
          }
        });
      }
  
      const updatedCategory = await category.save();
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  };

  
const updateCategory1 = async (categoryId, categoryData) => {
  try {

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};

const deleteCategory =  async(categoryId) => {
  try {
    await Category.findByIdAndDelete(categoryId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

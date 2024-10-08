const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true   

  },
  description: {
    type: String,
    required: true
  },
  richDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  images: {
    type: [String]
  },
  brand: {
    type: String

  },
  price: {
    type: Number,
    default:0,
    required: true,
    min:0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  countInStock: {
    type: Number,
    required: true,
    default:0,
    min: 0
  },
  rating: {
    type: Number,
    default :0
  },
  numRating:{
    type: Number,
    default :0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

productSchema.set('toJSON', { virtuals: true });
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price:Number,
    stock:Number
},{timestamps:true})
// time staps dice a que hora se modifico

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
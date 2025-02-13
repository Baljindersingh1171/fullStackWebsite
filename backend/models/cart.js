const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cartProducts: [
    {
      productid: { type: Number, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      totalprice: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      category: { type: String, required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

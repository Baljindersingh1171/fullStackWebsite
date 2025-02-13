const Cart = require("../models/cart");
const mongoose = require("mongoose");
const addToCart = async (req, res) => {
  const { productid, title, price, image, quantity, category } = req.body;
  const userId = req.userInfo.id;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        cartProducts: [
          {
            productid,
            title,
            price,
            totalprice: quantity * price,
            image,
            quantity,
            category,
          },
        ],
      });
    } else {
      const existingProduct = cart.cartProducts.find(
        (item) => item.productid === productid
      );

      if (existingProduct) {
        console.log("Product is already in the cart");

        existingProduct.quantity += quantity;
        existingProduct.totalprice =
          existingProduct.quantity * existingProduct.price;
      } else {
        console.log("Product is not available in the cart");

        cart.cartProducts.push({
          productid,
          title,
          price,
          totalprice: quantity * price,
          image,
          quantity,
          category,
        });
      }
    }

    await cart.save();
    return res.json({ msg: "Product added to cart successfully", cart });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getCartProducts = async (req, res) => {
  const userId = req.userInfo.id;
  try {
    const result = await Cart.findOne({ userId });
    return res.send(result.cartProducts);
  } catch (err) {
    return res.json({ err });
  }
};

const updateCart = async (req, res) => {
  const { quantity, totalprice } = req.body;
  const userId = req.userInfo.id;
  const specificProductId = req.params.id;
  const ProductId = new mongoose.Types.ObjectId(specificProductId);
  console.log("userId", userId);
  console.log("specificproductid", specificProductId);
  try {
    await Cart.updateOne(
      { userId, "cartProducts._id": ProductId },
      {
        $set: {
          "cartProducts.$.quantity": quantity,
          "cartProducts.$.totalprice": totalprice,
        },
      }
    );
    return res.json({ msg: "updated successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ err });
  }
};
const deleteCart = async (req, res) => {
  const userId = req.userInfo.id;
  const id = req.params.id;
  console.log("userid", userId);
  console.log("id", id);
  console.log("id", id);
  try {
    // await Cart.deleteOne({ userId, "cartProducts._id": id });
    await Cart.updateOne({ userId }, { $pull: { cartProducts: { _id: id } } });

    return res.json({ msg: "product is removed successfully" });
  } catch (error) {
    return res.json({ error });
  }
};
module.exports = { addToCart, getCartProducts, updateCart, deleteCart };

const express = require("express");
const {
  addToCart,
  getCartProducts,
  updateCart,
  deleteCart,
} = require("../controllers/cart");
const authenticateUser = require("../middlewares/auth");
const router = express.Router();
router.post("/", authenticateUser, addToCart);
router.get("/", authenticateUser, getCartProducts);
router.patch("/:id", authenticateUser, updateCart);
router.delete("/:id", authenticateUser, deleteCart);
module.exports = router;

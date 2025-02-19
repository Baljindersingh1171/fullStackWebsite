const express = require("express");

const {
  handleGetAllUsers,
  registerUser,
  getUser,
  checkUser,
  logout,
  resetPassword,
} = require("../controllers/user");
const emailVerification = require("../middlewares/verification");
const router = express.Router();
router.get("/", handleGetAllUsers);
router.post("/signup", registerUser);
router.post("/login", checkUser);
router.get("/logout", logout);
router.post("/resetpassword", emailVerification, resetPassword);
// router.get("/cart", authenticateUser, (req, res) => {
//   const { userId, role } = req.userInfo;

//   res.json({
//     message: "welcome to cart page",
//     user: {
//       id: userId,
//       role,
//     },
//   });
// });
// router.get("/:id", getUser);
module.exports = router;

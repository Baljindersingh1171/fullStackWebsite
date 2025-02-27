const express = require("express");
const verifyResetToken = require("../middlewares/verifyResetToken");

const {
  handleGetAllUsers,
  registerUser,
  getUser,
  checkUser,
  logout,
  resetPassword,
  update,
} = require("../controllers/user");

const router = express.Router();
router.get("/", handleGetAllUsers);
router.post("/signup", registerUser);
router.post("/login", checkUser);
router.get("/logout", logout);
router.post("/resetpassword", resetPassword);
router.get("/resetpassword/:resetToken", verifyResetToken, (req, res) => {
  console.log("responsee", req.email);
  res.status(200).json({ msg: "Valid token" });
});
router.post("/updateuserpassword/:resetToken", verifyResetToken, update);

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

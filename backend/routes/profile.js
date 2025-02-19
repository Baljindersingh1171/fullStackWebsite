const express = require("express");
const router = express.Router();
const profileMiddleware = require("../middlewares/profileMiddleware");
const { uploadProfile, getProfile } = require("../controllers/profile");
const authenticateUser = require("../middlewares/auth");

router.post(
  "/",
  authenticateUser,
  profileMiddleware.single("profile"),
  uploadProfile
);
router.get("/", authenticateUser, getProfile);
module.exports = router;

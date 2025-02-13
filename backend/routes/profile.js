const express = require("express");
const router = express.Router();
const profileMiddleware = require("../middlewares/profileMiddleware");
const { uploadProfile } = require("../controllers/profile");
router.post("/", profileMiddleware, uploadProfile);
module.exports = router;

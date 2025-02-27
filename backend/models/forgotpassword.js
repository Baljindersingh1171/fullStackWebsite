const mongoose = require("mongoose");

const ForgotPasswordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  resetToken: { type: String, required: true },
  resetTokenExpire: { type: Date, required: true },
});

module.exports = mongoose.model("ForgotPasswordRequest", ForgotPasswordSchema);

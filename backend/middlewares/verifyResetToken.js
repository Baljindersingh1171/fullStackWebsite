const ForgotPassword = require("../models/forgotpassword");

const validateResetToken = async (req, res, next) => {
  console.log("req.body", req.body);
  console.log("req.params", req.params);
  const { resetToken } = req.params;
  console.log("resetToken in validate", resetToken);
  try {
    const tokenData = await ForgotPassword.findOne({ resetToken });
    console.log("tokenData", tokenData);

    if (!tokenData || tokenData.resetTokenExpire <= Date.now()) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    req.body.email = tokenData.email;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = validateResetToken;

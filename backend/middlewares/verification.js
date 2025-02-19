const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const { Token_Expiration } = process.env;

const emailVerification = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Email is not registered" });
    }
    const OTP = Math.floor(100000 + Math.random() * 900000);
    user.otp = OTP;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      port: 465,
      auth: {
        user: "itsbaljindersingh17@gmail.com",
        pass: "jrivwbhcsaxotlyw",
      },
    });

    const mailOptions = {
      from: "itsbaljindersingh17@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      text: `OTP:-${OTP}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ msg: "Failed to send reset email" });
      }
      res.status(200).json({ msg: "Password reset email sent" });
      // next();
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "An error occurred, please try again" });
  }
};
module.exports = emailVerification;

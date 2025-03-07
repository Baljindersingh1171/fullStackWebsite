const User = require("../models/user");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { updateUserPassword } = require("../../frontend/src/apis/apis");
const { Unique_Key, EMAIL_USER, EMAIL_PASS, CLIENT_URL } = process.env;

// const crypto = require("crypto");
// const nodemailer = require("nodemailer");

const saltRounds = 10;
async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.status(200).json({ allUsers });
}

async function registerUser(req, res) {
  try {
    const { email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const result = await User.create({
        email,
        password: hashedPassword,
        role,
      });
      return res.status(201).json({ msg: "User created successfully" });
    } else {
      return res.json({ msg: "Email is already registered" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const checkUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      Unique_Key,
      {
        expiresIn: "1 min",
      }
    );
    res.cookie("accessToken", accessToken);

    return res.status(200).json({
      success: true,
      message: "Logged in successful",
      accessToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred");
  }
};
const logout = async (req, res) => {
  res.clearCookie("accessToken");
  return res.send("user logout successfully");
};

const resetPassword = async (req, res) => {
  const { email } = req.body;

  const crypto = require("crypto");
  const nodemailer = require("nodemailer");
  const User = require("../models/user");
  const ForgotPassword = require("../models/forgotpassword");

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Email is not registered" });
    }
    await ForgotPassword.deleteOne({ email });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = Date.now() + 60000;

    await ForgotPassword.create({ email, resetToken, resetTokenExpire });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: true,
      port: 465,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",

      html: `    <p>Click the link below to reset your password:</p> <a href="${CLIENT_URL}/${resetToken}">${CLIENT_URL}/${resetToken}</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: "Check Your Email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "An error occurred, please try again" });
  }
};
const update = async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const result = await User.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );
    console.log("result", result);
    return res.json({ msg: "Password Updated Successfully" });
  } catch (err) {}
};
module.exports = {
  handleGetAllUsers,
  registerUser,
  checkUser,
  logout,
  resetPassword,
  update,
};

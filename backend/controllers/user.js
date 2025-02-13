const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.status(200).json({ allUsers });
}

async function registerUser(req, res) {
  try {
    const { email, password, role } = req.body;
    const existingUser = User.findOne({ email });
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
      return res.status(401).send("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      "hello#232$$ded",
      {
        expiresIn: "15 min",
      }
    );
    res.cookie("accessToken", accessToken);

    return res.status(200).json({
      success: true,
      message: "Logged in successful",
      accessToken,
    });

    // res.cookie("uuid", token);
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred");
  }
};
const logout = async (req, res) => {
  res.clearCookie("accessToken");
  return res.send("user logout successfully");
};
// async function getUser(req, res) {
//   const user = await User.findById(req.params.id);
//   return res.status(200).json({ user });
// }
const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  console.log("email in mongodb", email);
  try {
    const user = await User.findOne({ email: email });
    console.log("user", user);
    if (user) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      await user.save();
      return res.json({ msg: "password is reset successfully" });
    } else {
      return res.json({ msg: "email is not registered" });
    }
  } catch (err) {}
};
module.exports = {
  handleGetAllUsers,
  registerUser,
  checkUser,
  logout,
  resetPassword,
};

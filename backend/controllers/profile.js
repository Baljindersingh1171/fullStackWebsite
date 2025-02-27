const path = require("path");
const fs = require("fs");
const User = require("../models/user");
const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
const uploadProfile = async (req, res) => {
  const { email } = req.userInfo;
  const user = await getUserByEmail(email);
  user.profile = req?.file?.path;
  await user.save();
  console.log("user", user);

  // console.log("file ", req.file);
  try {
    res.json({
      msg: "Profile uploaded successfully",
      filepath: req.file.path,
    });
  } catch (err) {}
};
const getProfile = async (req, res) => {
  const { email } = req.userInfo;
  console.log("email", email);
  const user = await getUserByEmail(email);
  console.log("user", user);
  console.log("user profile", user.profile);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  const profilePath = path.join(__dirname, "..", user.profile);
  console.log("profilePath", profilePath);
  try {
    if (fs.existsSync(profilePath)) {
      res.sendFile(profilePath);
    } else {
      res.status(404).json({ msg: "File not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = { uploadProfile, getProfile };

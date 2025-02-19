const path = require("path");
const fs = require("fs");
const User = require("../models/user");
const uploadProfile = async (req, res) => {
  const { email } = req.userInfo;
  const user = await User.findOne({ email: email });
  user.profile = req.file.path;
  user.save();
  console.log("user", user);

  console.log("file ", req.file);
  try {
    res.json({
      msg: "Profile uploaded successfully",
      filename: req.file.filename,
    });
  } catch (err) {}
};
const getProfile = async (req, res) => {
  console.log("req paramas", req.params);
  const { email } = req.userInfo;
  const user = await User.findOne({ email });

  const profilePath = path.join(__dirname, user.profile);
  console.log("profilepath", profilePath);
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

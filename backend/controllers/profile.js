const uploadProfile = async (req, res) => {
  try {
    console.log(req.file);
    res.json({ msg: "profile is upload successfully" });
  } catch (err) {}
};
module.exports = { uploadProfile };

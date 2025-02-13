const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const profile = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "../uploads");
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  upload.single("file");
  next();
};
module.exports = profile;

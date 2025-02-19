const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateUser = (req, res, next) => {
  console.log("authorization");
  const token = req?.cookies?.accessToken;
  // const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "access denied",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.Unique_Key);
    console.log("decodedtoken", decodedToken);
    req.userInfo = decodedToken;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "access denied",
    });
  }
};

module.exports = authenticateUser;

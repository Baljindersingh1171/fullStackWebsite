const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req?.cookies?.accessToken;
  console.log("headers", req.headers);
  console.log("cookies", req.cookies);

  // const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "access denied",
    });
  }
  try {
    const decodedToken = jwt.verify(token, "hello#232$$ded");
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

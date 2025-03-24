const jwt = require("jsonwebtoken");
const User = require("../models/User");
// To protect a route, we need to verify the token and find the user with the id
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // extract the token from the header
      token = req.headers.authorization.split(" ")[1];
      // verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // find the user with the id
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error("Error protecting route", error);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  // this handles the case where no token exists at all
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};

module.exports = protect;

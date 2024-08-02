const jwt = require("jsonwebtoken");

const JWTKEYSTRING = "lasdfjkflsdjf";

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // split from Bearer XXXX
    const decoded = jwt.verify(token, JWTKEYSTRING);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};

module.exports = checkAuth;
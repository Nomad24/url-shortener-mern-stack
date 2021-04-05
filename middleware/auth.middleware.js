const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[0]; //Token

    if (!token) {
      return res.status(401).json({ message: "No Authorization" });
    }
    
    const decoded = jwt.verify(token, config.get("secret"));
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "No Authorization" });
  }
};

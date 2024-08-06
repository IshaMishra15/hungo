// middleware/tokenBlacklist.js
const blacklist = new Set();

const tokenBlacklist = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  if (blacklist.has(token)) {
    return res.status(401).json({ message: "Token is blacklisted" });
  }

  // Add token to blacklist
  blacklist.add(token);

  // Optional: Set a timeout to remove the token from the blacklist after it expires
  const tokenExpirationTime = 3600000; // Adjust this to match your token's expiration time
  setTimeout(() => {
    blacklist.delete(token);
  }, tokenExpirationTime);

  next();
};

module.exports = { tokenBlacklist, blacklist };

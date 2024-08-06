// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(
//     token,
//     "9c72cba9e8bcb5b3fc08cf64a5d2de8d7d3e6b7385e6e1a7",
//     async (err, user) => {
//       if (err) return res.sendStatus(403);

//       try {
//         const fullUser = await User.findById(user.userId); // Ensure userId is included in the token payload
//         if (!fullUser) return res.sendStatus(404);

//         req.user = fullUser;
//         next();
//       } catch (err) {
//         res.sendStatus(500);
//       }
//     }
//   );
// };

// module.exports = authenticateToken;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    "9c72cba9e8bcb5b3fc08cf64a5d2de8d7d3e6b7385e6e1a7",
    async (err, user) => {
      if (err) return res.sendStatus(403);

      try {
        const fullUser = await User.findById(user.userId); // Ensure userId is included in the token payload
        if (!fullUser) return res.sendStatus(404);

        req.user = fullUser;
        next();
      } catch (err) {
        res.sendStatus(500);
      }
    }
  );
};

module.exports = authenticateToken;

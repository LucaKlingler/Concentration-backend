const jwt = require('jsonwebtoken');
const User = require('User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send();
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('not authorized');
    req.decodedUserId = decoded.userId;
    User.findById(decoded.userId, async (errAuthedUsr, usr) => {
      if (errAuthedUsr) return res.status(500).send();
      if (usr === null) return res.status(401).send();
      const whitelistRoutes = [];
      req.decodedUser = usr;
      next();
    });
  });
};

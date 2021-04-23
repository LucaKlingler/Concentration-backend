const jwt = require('jsonwebtoken');
const User = require('User');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) return res.status(401).send('not authorized');
    req.decodedUserId = decoded.userId;
    User.findById(decoded.userId, async (errAuthedUsr, usr) => {
      if (errAuthedUsr) return res.status(500).send();
      if (usr === null) return res.status(401).send();
      const whitelistRoutes = ['/api/v1/auth/verifyPhone', '/api/v1/auth/resendVerificationSms'];
      if (!usr.ts.verifiedPhone && !whitelistRoutes.includes(req.baseUrl)) return res.status(409).send('validate phone please');
      req.decodedUser = usr;
      next();
    });
  });
};
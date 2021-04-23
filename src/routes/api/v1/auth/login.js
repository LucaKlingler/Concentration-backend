const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config.json');
const User = require('User');

// user login endpoint
router.post('/', (req, res) => {
  // searches for user in database
  User.findOne({ username: req.body.username })
    .then((usr) => {
      if (!usr) {
        res.status(401).send('invalid credentials');
      // checks password validity
      } else if (bcrypt.compareSync(req.body.pwd, usr.pwd)) {
        // generates session token
        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ userId: usr._id }, config.jwtSecret);
        // send session token
        res.status(200).json(
          {
            token,
            preName: usr.preName,
            lastName: usr.lastName,
          },
        );
      } else {
        res.status(401).send('invalid credentials');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ title: 'server error', err });
    });
});

module.exports = router;

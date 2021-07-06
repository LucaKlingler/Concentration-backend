const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sha512 = require('js-sha512');
const User = require('User');
const config = require('config');

router.post('/', async (req, res) => {
  const hashStr = `${req.body.username}:${req.body.preName}:${req.body.lastName}`;
  const hash = await sha512(hashStr);
  if (req.body.hash !== hash) return res.status(401).send();
  const newUser = new User({
    username: req.body.username,
    pwd: bcrypt.hashSync(req.body.pwd, 10),
    preName: req.body.preName,
    lastName: req.body.lastName,
    role: req.body.role,
    createdTs: Date.now(),
  });
  newUser.save()
    .then((usr) => {
      const token = jwt.sign({ userId: usr._id }, config.jwtSecret);
      // send session token
      res.status(200).json(
        {
          token,
          preName: usr.preName,
          lastName: usr.lastName,
        },
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send('account taken');
    });
});

module.exports = router;

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sha512 = require('js-sha512');
const User = require('User');
const config = require('config');
const smsService = require('../../../../services/smsMessente');

router.post('/', async (req, res) => {
  const hashStr = `${req.body.username}:${req.body.phone}:${req.body.preName}:${req.body.lastName}`;
  const hash = await sha512(hashStr);
  if (req.body.hash !== hash) return res.status(401).send();
  const newUser = new User({
    username: req.body.username,
    phone: req.body.phone,
    phoneToken: Math.floor(100000 + Math.random() * 900000),
    pwd: bcrypt.hashSync(req.body.pwd, 10),
    preName: req.body.preName,
    lastName: req.body.lastName,
    appHash: req.body.appHash,
    fcmToken: req.body.fcmToken,
  });
  newUser.ts.phoneToken = Date.now();
  newUser.save()
    .then((usr) => {
      smsService.sendSms(usr.phone, usr.phoneToken,
        usr.appHash).then(() => {
        const token = jwt.sign({ userId: usr._id }, config.jwtSecret);
        // send session token
        res.status(200).json(
          {
            token,
            preName: usr.preName,
            lastName: usr.lastName,
          },
        );
      }).catch((err) => {
        console.log(err);
        newUser.delete();
        res.status(500).send();
      });
      usr.authorizedUserIds = [usr._id];
      usr.save();
    })
    .catch(() => {
      res.status(400).send('account taken');
    });
});

module.exports = router;

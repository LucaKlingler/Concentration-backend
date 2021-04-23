const router = require('express').Router();
const User = require('User');

router.get('/', (req, res) => {
  User.findById(req.decodedUserId)
    .then((usr) => {
      if (!usr) {
        res.status(401).send();
      } else {
        res.status(200).send();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ title: 'server error', err });
    });
});

module.exports = router;

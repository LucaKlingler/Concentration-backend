const router = require('express').Router();

router.post('/', (req, res) => {
  if (req.decodedUser.phoneToken !== req.body.phoneToken) return res.status(400).send('invalid token');
  if ((Date.now() - req.decodedUser.ts.phoneToken) > 1000 * 60 * 10) return res.status(400).send('token expired');
  req.decodedUser.phoneToken = undefined;
  req.decodedUser.ts.verifiedPhone = Date.now();
  req.decodedUser.save().then(() => {
    res.status(200).send('token valid, verfied');
  });
});

module.exports = router;

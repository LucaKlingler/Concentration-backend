const router = require('express').Router();
const axios = require('axios');
const Captcha = require('../../../../models/Captcha.js');

// speichern des erledigten Captcha in DB und zurücksenden der gebrauchten Zeit
router.post('/', async (req, res) => {
  // console.log(req.body);
  const update = req.body;
  update.userId = req.decodedUser._id;
  const captcha = new Captcha(update);
  await captcha.save();
  // console.log(captcha);
  await res.status(200).send(`${(req.body.endTime - req.body.startTime) / 1000}`);
});

module.exports = router;

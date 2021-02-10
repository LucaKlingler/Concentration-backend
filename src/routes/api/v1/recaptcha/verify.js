const router = require('express').Router();
const axios = require('axios');
const Captcha = require('../../../../models/Captcha.js');

//speichern des erledigten Captcha in DB und zurücksenden der gebrauchten Zeit
router.post('/', async (req, res) => {
  console.log(req.body);
  const captcha = new Captcha(req.body);
  await captcha.save();
  await res.status(200).send(`solved captcha!\ntook: ${(req.body.endTime - req.body.startTime) / 1000} seconds`)
});

module.exports = router;

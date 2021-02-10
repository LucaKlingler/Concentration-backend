const router = require('express').Router();
const axios = require('axios');
const Captcha = require('../../../../models/Captcha.js');

//ruft letzten 5 Captchas aus DB ab
router.get('/', async (req, res) => { 
  const captchas = await Captcha.find().sort({ _id: -1 }).limit(5);
  const arr = [];
  captchas.forEach((e) => {
    arr.push({
      start: e.startTime,
      end: e.endTime,
      fails: e.fails,
    });
  });
  res.status(200).json(arr);
});

module.exports = router;

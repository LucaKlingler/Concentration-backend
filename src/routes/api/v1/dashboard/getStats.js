const router = require('express').Router();
const axios = require('axios');
const Captcha = require('../../../../models/Captcha.js');

//ruft alle Captchas aus DB ab
router.get('/', async (req, res) => {
  Captcha.find({}, (err, captchas) => {
    const arr = [];
    captchas.forEach((e) => {
      arr.push({
        time: e.startTime,
        conz: (e.endTime - e.notificationTime) / 1000,
      });
    });
    res.status(200).json(arr);
  });
});

module.exports = router;

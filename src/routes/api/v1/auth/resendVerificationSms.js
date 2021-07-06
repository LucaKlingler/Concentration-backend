const router = require('express').Router();
const smsService = require('../../../../services/smsMessente');

router.get('/', (req, res) => {
  req.decodedUser.phoneToken = Math.floor(100000 + Math.random() * 900000);
  req.decodedUser.ts.phoneToken = Date.now();
  req.decodedUser.phoneVerificationAttempts += 1;
  req.decodedUser.save();
  smsService.sendSms(req.decodedUser.phone, req.decodedUser.phoneToken,
    req.decodedUser.appHash).then(() => {
    res.status(200).json();
  }).catch((err) => {
    console.log(err);
    res.status(500).send();
  });
});

module.exports = router;

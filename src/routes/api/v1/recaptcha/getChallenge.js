const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.status(200).send({
    size: 4,                        //Eckdaten der Captcha-Challenge werden hier definiert,
    challenge: 3,                   //um einfacheres Ändern zu ermöglichen
  });
});

module.exports = router;
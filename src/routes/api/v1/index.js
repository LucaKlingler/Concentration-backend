const router = require('express').Router();

const recaptchaRoute = require('./recaptcha');
const dashboardRoute = require('./dashboard');

router.use('/recaptcha', recaptchaRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;
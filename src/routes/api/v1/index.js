const router = require('express').Router();

const authRoute = require('./auth');
const recaptchaRoute = require('./recaptcha');
const dashboardRoute = require('./dashboard');

router.use('/auth', authRoute);
router.use('/recaptcha', recaptchaRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;
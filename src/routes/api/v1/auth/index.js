const router = require('express').Router();
const auth = require('auth');

const loginRoute = require('./login');
const signupRoute = require('./signup');
const validateRoute = require('./validate');

router.use('/login', loginRoute);
router.use('/signup', signupRoute);
router.use('/validate', auth, validateRoute);

module.exports = router;

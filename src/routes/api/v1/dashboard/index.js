const router = require('express').Router();
const auth = require('auth');

const getStatsRoute = require('./getStats');
const getHistoryRoute = require('./getHistory');

router.use('/getStats', auth, getStatsRoute);
router.use('/getHistory', auth, getHistoryRoute);

module.exports = router;

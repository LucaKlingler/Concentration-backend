const router = require('express').Router();

const getStatsRoute = require('./getStats');
const getHistoryRoute = require('./getHistory');

router.use('/getStats', getStatsRoute);
router.use('/getHistory', getHistoryRoute);

module.exports = router;
const router = require('express').Router();

const verifyRoute = require('./verify');
const getChallengeRoute = require('./getChallenge');

router.use('/verify', verifyRoute);
router.use('/getChallenge', getChallengeRoute);

module.exports = router;
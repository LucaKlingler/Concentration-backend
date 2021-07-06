const router = require('express').Router();
const auth = require('auth');

const verifyRoute = require('./verify');
const getChallengeRoute = require('./getChallenge');

router.use('/verify', auth, verifyRoute);
router.use('/getChallenge', auth, getChallengeRoute);

module.exports = router;

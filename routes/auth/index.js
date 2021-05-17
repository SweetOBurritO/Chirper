const express = require('express');
const router = express.Router();
const googleAuthRoutes = require('./google');
const twitterAuthRoutes = require('./twitter');
const passport = require('passport');
const { statusCodes } = require('../../constants');
const { Response } = require('../../models');

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

router.use('/google', googleAuthRoutes);
router.use('/twitter', twitterAuthRoutes);

router.use('*', (req, res) => {
	const notFoundMessage = 'Invalid Endpoint';
	const response = new Response(statusCodes.notFound, notFoundMessage, notFoundMessage);

	res.status(statusCodes.notFound);
	res.send(response);
});

module.exports = router;

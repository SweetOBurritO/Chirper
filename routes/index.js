const express = require('express');
const cheeps = require('./cheeps');
const auth = require('./auth');
const users = require('./users');
const { statusCodes } = require('../constants');
const { Response } = require('../models');

const router = new express.Router();

router.use('/auth', auth);
router.use('/cheeps', cheeps);
router.use('/users',users);

router.get('*', (req, res) => {
	const notFoundMessage = 'Invalid Endpoint';
	const response = new Response(statusCodes.notFound, notFoundMessage, notFoundMessage);

	res.status(statusCodes.notFound);
	res.send(response);
});

module.exports = router;

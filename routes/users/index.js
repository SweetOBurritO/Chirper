const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { Response } = require('../../models');
const { statusCodes } = require('../../constants');

const controller = new UserController();

router.get('/current', async (req, res) => {
    let user = req.session.passport.user;

	const response = new Response(statusCodes.success, user, null);
	res.send(response.toResponseObject());
});

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const user = await controller.getByID(id);
	const response = new Response(statusCodes.success, user, null);

	res.send(response.toResponseObject());
});

router.put('/:id', async (req, res) => {
	const { id } = req.params;
    console.log(req.body);
	const result = await controller.update(id, req.body);
	const response = new Response(statusCodes.success, result, null);

	res.send(response.toResponseObject());
});

module.exports = router;

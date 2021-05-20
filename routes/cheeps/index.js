const express = require('express');
const { Cheep, Response } = require('../../models');
const { CheepController } = require('../../controllers');
const { statusCodes } = require('../../constants');

const cheeps = new express.Router();
const cheepController = new CheepController();

cheeps.get('/', async (req, res) => {
	const query = req.query;
	const cheeps = await cheepController.get(query);
	const response = new Response(statusCodes.success, cheeps, null);

	res.send(response.toResponseObject());
});

cheeps.get('/:id', async (req, res) => {
	const { id } = req.params;
	const cheep = await cheepController.getByID(id);
	const response = new Response(statusCodes.success, cheep, null);

	res.send(response.toResponseObject());
});

cheeps.post('/', async (req, res) => {
	const { title, text, date, userDisplayName, username, userProfileImage, userID } = req.body;
	const cheep = new Cheep({title, text, date, userDisplayName, username, userProfileImage, userID});
	const success = await cheepController.insert(cheep);
	const response = new Response(statusCodes.success, { success: success }, null);

	res.send(response.toResponseObject());
});

cheeps.put('/:id', async (req, res) => {
	const { id } = req.params;
	const updateValues = req.body;
	const success = await cheepController.update(id, updateValues);
	const response = new Response(statusCodes.success, { success: success }, null);

	res.send(response.toResponseObject());
});

cheeps.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const success = await cheepController.delete(id);
	const response = new Response(statusCodes.success, { success: success }, null);

	res.send(response.toResponseObject());
});

module.exports = cheeps;

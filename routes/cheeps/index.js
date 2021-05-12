const express = require('express');
const {Cheep, Response} = require('../../models');
const {CheepController} = require('../../controllers');

const cheeps = new express.Router();
const cheepController = new CheepController();

cheeps.get('/', async (req, res) => {
  const query = req.query;
  const cheeps = await cheepController.get(query);
  const response = new Response(200, cheeps, null);

  res.send(response.toResponseObject());
});

cheeps.get('/:id', async (req, res) => {
  const {id} = req.params;
  const cheep = await cheepController.getByID(id);
  const response = new Response(200, cheep, null);

  res.send(response.toResponseObject());
});

cheeps.post('/', async (req, res) => {
  const {text, date, username, userImageUrl} = req.body;
  const cheep = new Cheep(text, date, username, userImageUrl);

  const success = await cheepController.insert(cheep);

  const response = new Response(200, {sucess: success}, null );
  res.send(response.toResponseObject());
});

cheeps.put('/:id', async (req, res) => {
  const {id} = req.params;

  const response = new Response(200, `Cheeps: update id: ${id}`, null );
  res.send(response.toResponseObject());
});

cheeps.delete('/:id', async (req, res) => {
  const {id} = req.params;
  const response = new Response(200, `Cheeps: delete id: ${id}`, null );
  res.send(response.toResponseObject());
});

module.exports = cheeps;

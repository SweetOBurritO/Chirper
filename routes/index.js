const express = require('express');
const router = new express.Router();

router.get('/', async (request, response) => {
  response.status(200);
  response.send(`Hello API ${process.env.NODE_ENV}`);
});

router.get('*', (request, response) => {
  response.status(400);
  response.send('Invalid Endpoint');
});

module.exports = router;

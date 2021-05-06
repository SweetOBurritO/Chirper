const express = require('express');

const router = new express.Router();

router.get('/', (request, response)=>{
  response.status(200);
  response.send('Hello API');
});

module.exports = router;

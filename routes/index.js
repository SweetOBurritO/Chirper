const express = require('express');
const cheeps = require('./cheeps');

const router = new express.Router();


router.use('/cheeps', cheeps );

router.get('*', (req, res) => {
  res.status(404);
  res.send('Invalid Endpoint');
});

module.exports = router;

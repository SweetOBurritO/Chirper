const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.use(express.static('app'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/static/index.html'));
});

app.listen(port, (error)=>{
  if (error) {
    console.error('Server failed to start:');
    console.error(error);
  }

  console.log(`Server running on port : ${port}`);
});

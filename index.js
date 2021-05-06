const express = require('express');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;


app.use('/api', apiRoutes);

app.use('/', express.static('app'));


app.listen(port, (error)=>{
  if (error) {
    console.error('Server failed to start:');
    console.error(error);
  }

  console.log(`Server running on port : ${port}`);
});

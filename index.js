const express = require('express');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;


app.use('/api', apiRoutes);

app.use('/', express.static('app'));

app.get('*', (request, response)=>{
  response.send('Error 404 : Page not found');
});


app.listen(port, (error)=>{
  if (error) {
    console.error('Server failed to start:');
    console.error(error);
  }

  console.log(`Server running on port : ${port}`);
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const session = require('express-session');
const mongoose = require('mongoose');
const middleware = require('./middleware');

if (process.env.NODE_ENV !== 'production') {
	const dotenv = require('dotenv');
	dotenv.config();
}

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const app = express();
const devPort = 3000;
const port = process.env.PORT || devPort;
const sessionSecret = process.env.SESSION_SECRET;
const apiRoutes = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: sessionSecret, resave: true, saveUninitialized: false }));
app.use(express.static('app'));
app.use(middleware.loginHandler);

app.use('/api', apiRoutes);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname + '/app/static/index.html'));
});

app.listen(port, (error) => {
	if (error) {
		throw error;
	}

	// eslint-disable-next-line no-console
	console.log(`Server running on port : ${port}`);
});

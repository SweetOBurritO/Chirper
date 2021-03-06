const authFreeRoutes = [
	'/login',
	'/register',
	'/'
];

const loginHandler = (req, res, next) => {
	const endpoint = req.originalUrl;
	const isLoginUrl = authFreeRoutes.includes(endpoint);
	const isAuthRoute = endpoint.startsWith('/api/auth');

	if (isLoginUrl || isAuthRoute) {
		return next();
	}

	if (req.session.passport && req.session.passport.user) {
		return next();
	}

	res.redirect('/login');
};

module.exports = loginHandler;

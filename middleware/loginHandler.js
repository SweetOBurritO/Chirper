const loginHandler = (req, res, next) => {
	const endpoint = req.originalUrl;
	const isLoginUrl = endpoint === '/login';
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

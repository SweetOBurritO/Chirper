const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../../../models');

const router = new express.Router();

const googleClient = process.env.GOOGLE_CLIENT_ID;
const gooogleSecret = process.env.GOOGLE_CLIENT_SECRET;
const baseUrl = process.env.BASE_URL;

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClient,
			clientSecret: gooogleSecret,
			callbackURL: `${baseUrl}/api/auth/google/callback`
		},
		async (accessToken, refreshToken, profile, done) => {
			const foundGoogleUser = await User.findOne({ googleID: profile.id, email: profile.emails[0].value });

			if (foundGoogleUser) {
				done(null, foundGoogleUser);
				return;
			}

			const foundEmailUser = await User.findOne({ email: profile.emails[0].value });

			if (foundEmailUser) {
				foundEmailUser.googleID = profile.id;
				foundEmailUser.save();
				done(null, foundEmailUser);
				return;
			}

			const newUser = new User({
				googleID: profile.id,
				name: profile.displayName,
				email: profile.emails[0].value,
				profilePicture: profile.photos[0].value
			});

			newUser.save();
			done(null, newUser);
			return;
		}
	)
);

router.get(
	'/',
	passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	})
);

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
	res.redirect('/home');
});

module.exports = router;

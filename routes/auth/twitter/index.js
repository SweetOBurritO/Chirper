const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const { User } = require('../../../models');

const router = new express.Router();

const twitterKey = process.env.TWITTER_KEY;
const twitterSecret = process.env.TWITTER_SECRET;
const baseUrl = process.env.BASE_URL;

passport.use(
	new TwitterStrategy(
		{
			consumerKey: twitterKey,
			consumerSecret: twitterSecret,
			userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
			callbackURL: `${baseUrl}/api/auth/twitter/callback`
		},
		async (token, tokenSecret, profile, done) => {
			const foundTwitterUser = await User.findOne({ twitterID: profile.id, email: profile.emails[0].value });

			if (foundTwitterUser) {
				done(null, foundTwitterUser);
				return;
			}

			const foundEmailUser = await User.findOne({ email: profile.emails[0].value });

			if (foundEmailUser) {
				foundEmailUser.twitterID = profile.id;
				foundEmailUser.save();
				done(null, foundEmailUser);
				return;
			}

			const newUser = new User({
				twitterID: profile.id,
				name: profile.displayName,
				location: profile._json.location,
				email: profile.emails[0].value,
				profilePicture: profile.photos[0].value
			});

			newUser.save();
			done(null, newUser);
			return;
		}
	)
);

router.get('/', passport.authenticate('twitter'));

router.get('/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
	res.redirect('/');
});

module.exports = router;

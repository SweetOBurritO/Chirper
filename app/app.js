import { Home } from './views/home/home.js';
import { Posts } from './views/posts/posts.js';
import { Router } from './router.js';
import { Settings } from './views/settings/settings.js';
import { Profile } from './views/profile/profile.js';
import { Landing } from './views/landing/landing.js';
import { Login } from './views/login/login.js';

const App = async () => {
	const routes = [
		{
			path: '/',
			view: Landing
		},
		{
			path: '/home',
			view: Home
		},
		{
			path: '/posts',
			view: Posts
		},
		{
			path: '/profile/:id',
			view: Profile
		},
		{
			path: '/settings',
			view: Settings
		},
		{
			path: '/login',
			view: Login
        },
        {
			path: '/register',
			view: Login
		}
	];

	const router = Router(routes);

	window.getRouter = () => {
		return router;
	};
};

App();

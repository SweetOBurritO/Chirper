import {Home} from './views/home/home.js';
import {Posts} from './views/posts/posts.js';
import {Router} from './router.js';
import {Settings} from './views/settings/settings.js';
import {Profile} from './views/profile/profile.js';



const App = async () => {

    const routes = [
        {
            path: '/',
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
        }
    ];

    const router = Router(routes);

    window.getRouter = () => {
        return router;
    };
};

App();
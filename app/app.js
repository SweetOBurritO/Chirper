import {Home} from './views/home/home.js';
import {Posts} from './views/posts/posts.js';
import {Router} from './router.js';
import {Settings} from './views/settings/settings.js';
import {Landing} from './views/landing/landing.js';



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
import {View} from '../view.js';
import {Posts} from '../posts/posts.js';

export const Home = View({
    name: 'home',
    title: 'Home',


    data: {
        posts: Posts,
    },

});

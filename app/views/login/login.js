import {View} from '../view.js';

export const Login = View({
    path: '/views',
    name: 'login',
    title: 'Login',

    data: {
        title: ''
    },
    onLoad : ()=>{
        let title = 'Log in';

        if (location.pathname ==='/register') {
            title = 'Register';
        }

        Login.setData({
            title:title
        });
    }
});
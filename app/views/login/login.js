import {View} from '../view.js';

const pageData = {
    register:{
        title : 'Welcome to Chirper',
        message:'Dont confuse us with twitter'
    },
    login:{
        title : 'Good to see you again',
        message:'We\'re still not twitter'
    }
};

export const Login = View({
    path: '/views',
    name: 'login',
    title: 'Login',

    data: {
        title: '',
        message:''
    },
    onLoad : ()=>{
        let page = 'login';

        if (location.pathname ==='/register') {
            page = 'register';
        }

        Login.setData({
            title:pageData[page].title,
            message:pageData[page].message
        });
    }
});
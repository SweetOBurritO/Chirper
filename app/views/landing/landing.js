import {View} from '../view.js';

export const Landing = View({
    name: 'landing',
    title: 'Chirper, Where its at',
    data: {
        loggedIn:false
    },
    router: null,

    onLoad(){
        this.router = window.getRouter();
        if(!!window.loggedIn)
        {
            this.router.navigateTo('/home');
        }
    },



    methods: {
        signUp(){
            this.router.navigateTo('/home');
            window.loggedIn =true;
        }
    }



});
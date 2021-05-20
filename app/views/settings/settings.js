import {View} from '../view.js';

export const Settings = View({
    path: '/views',
    name: 'settings',
    title: 'Settings',

    data: {
        username: '',
        userBio: '',
    },
    methods: {
        saveChanges: async () => {
            let newUsername = document.getElementById("username").value;
            let newUserBio = document.getElementById("userBio").value;

            // save data to db


            // take user back to own profile
            window.getRouter().navigateTo('/profile'); 
        }
    },
    onLoad: ()  => {
        // get user data from db
        let x = { 
            username: 'User#0',
            userBio: 'This is my user bIo.',
        };

        // assign data to view
        Settings.setData(x);
    },

});
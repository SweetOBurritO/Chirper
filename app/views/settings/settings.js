import {View} from '../view.js';

export const Settings = View({
    path: '/views',
    name: 'settings',
    title: 'Settings',

    data: {
        username: '',
        userBio: '',
        userLocation: '',
        imageUrl: ''
    },
    methods: {
        fetchCurrentUserData: async () => {
            let response = await fetch(`/api/users/current`);
            let json = await response.json();
            if (json.data != null) {
                return json.data.result;
            } else {
                return null;
            }
        },
        saveChanges: async () => {
            let newUsername = document.getElementById("username").value;
            let newUserBio = document.getElementById("userBio").value;
            let newUserLocation = document.getElementById("userLocation").value;
            let newImageUrl = document.getElementById("imageUrl").value;

            let updateData = {
                profilePicture: newImageUrl,
                name: newUsername,
                location: newUserLocation,
                description: newUserBio
            };

            let myData = await Settings.methods.fetchCurrentUserData();
            let myId = myData._id;

            // save data to db
            await fetch(`/api/users/${myId}`, {
                method: "PUT",
                body: JSON.stringify( updateData ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });

            // take user back to own profile
            window.getRouter().navigateTo('/profile'); 
        }
    },
    onLoad: async ()  => {

        // get user data from db
        let myData = await Settings.methods.fetchCurrentUserData();

        let defaultValues = { 
            username: myData.name,
            userBio: myData.description,
            userLocation: myData.location,
            imageUrl: myData.profilePicture
        };

        // assign data to view
        Settings.setData(defaultValues);
    },

});
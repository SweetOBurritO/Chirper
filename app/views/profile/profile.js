import {View} from '../view.js';
import { Cheep } from '../../components/cheep/cheep.js';
import {Trends} from '../../components/trends/trends.js';

export const Profile = View({
    path: '/views',
    name: 'profile',
    title: 'Profile',

    data: {
        cheep: Cheep,
        trends: Trends,
        name: '',
        email: '',
        profilePicture: '',
        dateOfBirth: '',
        location: '',
        description: '',
        followerCount: 0,
        followingCount: 0,
        cheeps : []
    },
    methods : {
        editProfile: () => {
            window.getRouter().navigateTo('/settings');
        },
        fetchCurrentUserData: async () => {
            let response = await fetch(`/api/users/current`);
            let json = await response.json();
            if (json.data != null) {
                return json.data.result;
            } else {
                return null;
            }
        },
        fetchProfileData: async (userId) => {
            let response = await fetch(`/api/users/${userId}`);
            let json = await response.json();
            if (json.data != null) {
                return json.data.result;
            } else {
                return null;
            }
        },
    },
    onLoad: async ()  => {
        // using user id in url
        let pathSplit = location.pathname.split('/');
        let userId = pathSplit[2];

        // TODO: get logged in users id from session? from cookie?
        // Get users _id from db to test
        // userId = '60a3816d45e9cb5f34374795';
        let myData = await Profile.methods.fetchCurrentUserData();
        let myId = myData._id;

        // redirect to logged in users profile
        if (userId == undefined) {
            window.getRouter().navigateTo(`/profile/${myId}`);
            return;
        }

        // get user data from db
        // consider caching it and fetching from cache first
        let profileData = await Profile.methods.fetchProfileData(userId);

        // userdata not found
        if (profileData == null) {
            window.getRouter().navigateTo('/home');
            return;
        }

        // format date
        profileData.dateOfBirth = profileData.dateOfBirth.slice(0, 10);

        // assign data to view
        Profile.setData(profileData);
    },

});
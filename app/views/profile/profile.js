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
            let response = await fetch('/api/users/current');
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
        loadCheeps : async(userID)=>{
            const response = await fetch(`/api/cheeps?userID=${userID}`);
            const json = await response.json();
            const cheepsRaw = json.data.result;
            const cheeps = [];

            cheepsRaw.forEach(element => {
                const cheep = {
                    imageSrc: element.userProfileImage,
                    handle: element.username,
                    heading: element.title,
                    body: element.text
                };
                cheeps.push(cheep);
            });

            return cheeps;
        }
    },
    onLoad: async ()  => {
        // using user id in url
        let pathSplit = location.pathname.split('/');
        let userId = pathSplit[2];

        let myData = await Profile.methods.fetchCurrentUserData();
        let myId = myData._id;

        if (userId == undefined) {
            window.getRouter().navigateTo(`/profile/${myId}`);
            return;
        }

        const profileData = await Profile.methods.fetchProfileData(userId);
        const cheeps = await Profile.methods.loadCheeps(myId);

        profileData.dateOfBirth = profileData.dateOfBirth.slice(0, 10);

        Profile.setData({
            ...profileData,
            cheeps
        });

        const router = window.getRouter();

        router.updateHtml(Profile, {path:`/profile/${myId}`});
    },
});
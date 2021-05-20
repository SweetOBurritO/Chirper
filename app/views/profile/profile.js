import {View} from '../view.js';

export const Profile = View({
    path: '/views',
    name: 'profile',
    title: 'Profile',

    data: {
        name: '',
        email: '',
        profilePicture: '',
        dateOfBirth: '',
        location: '',
        description: '',
        followerCount: 0,
        followingCount: 0,
        cheeps : [],
        isOwnProfile: true,
        notOwnProfile: false,
        followButtonText: 'FOLLOW'
    },
    methods : {
        toggleFollowUser: () => {
            let buttonText = (document.getElementById('toggleFollowButton').innerHTMl == 'FOLLOW' ? 'UNFOLLOW' : 'FOLLOW');
            document.getElementById('toggleFollowButton').innerHTMl = buttonText;
            Profile.setData({followButtonText: buttonText});
            // update db
        },
        editProfile: () => {
            window.getRouter().navigateTo('/settings');
        },
        fetchProfileData: async (userId) => {
            let response = await fetch(`/api/users/${userId}`)
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
        let myId = 0;

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

        // check if profile is logged in users
        let isOwnProfile = userId == myId;

        // check if profile is followed by logged in user
        let isFollowing = userId == 2;

        let displayConfiguration = {
            isOwnProfile: isOwnProfile,
            notOwnProfile: !isOwnProfile,
            followButtonText: isFollowing ? 'UNFOLLOW' : 'FOLLOW'
        };

        // assign data to view
        Profile.setData(profileData);
        Profile.setData(displayConfiguration);
        
    },

});
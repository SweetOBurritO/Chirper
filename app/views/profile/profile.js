import { Router } from '../../router.js';
import {View} from '../view.js';

export const Profile = View({
    path: '/views',
    name: 'profile',
    title: 'Profile',

    data: {
        username: '',
        userTag: '',
        profileImage: '',
        dateOfBirth: '',
        location: '',
        userBio: '',
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
    },
    onLoad: ()  => {
        // using user id in url
        let pathSplit = location.pathname.split('/');
        let userId = pathSplit[2];

        // get logged in users id from session? from cookie?
        let myId = 0;

        // redirect to logged in users profile
        if (userId == undefined) {
            window.getRouter().navigateTo(`/profile/${myId}`);
            return;
        }

        // get user data from db
        // consider caching it and fetching from cache first
        let profileData = { 
            username: 'User#'+userId,
            userTag: '@dontAtMe'+userId,
            profileImage: '/static/images/defaultProfileImage.jpg',
            dateOfBirth: new Date(2021, 6, 21).toDateString(),
            location: 'Chirper',
            userBio: 'This is my user bIo.',
            followerCount: 0,
            followingCount: 12,
            cheeps : [
                {
                    message: 'I personally think Chirper is better than Twitter.'
                },
                {
                    message: 'ahh the pepeloni, pepeloni. you know the pepeloni?\n'+
                            'the nooo one. i always, i always order the, the domino.\n'+
                            'domino pepeloni and without pepeloni.\n\n'+
                            'i always order the pepeloni and without pepeloni. pepeloni!\n'+
                            'i like pepeloni, yeah. i always, i always order the, the cheese- cheese pan.\n'+
                            'ahh how can i explain? i can explain by my drawing!\n'+
                            'i always order like the cheese pan that it has cheese on here, this part, the ear.\n'+
                            'ear of pizza. and then, i order- wh- when i order pepeloni, the ear-\n'+
                            'it always have a pepeloni on h- on a top, but i pick up these... away!\n'+
                            'cause i don\'t eat it. and then i eat the cheese pan pizza. okay?\n'+
                            'you understand? understandable! pepeloni! yes.'
                },
                {
                    message: 'Hi, I\'m new.'
                }
            ]
        };

        // userdata not found
        if (profileData == null) {
            window.getRouter().navigateTo('/home');
            return;
        }

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
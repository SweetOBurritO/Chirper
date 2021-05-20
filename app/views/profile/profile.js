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
        username: '',
        userTag: '',
        profileImage: '',
        dateOfBirth: '',
        location: '',
        userBio: '',
        followerCount: 0,
        followingCount: 0,
        cheeps : []
    },

    onLoad: ()  => {
        // using user id in url
        let pathSplit = location.pathname.split('/');
        let userId = pathSplit[2];
        let userIdParsed = Number.parseInt(userId, 10);

        // if userId not a number, redirect to home
        if (Number.isNaN(userIdParsed) || userIdParsed.toString() != userId) {
            window.location.href = '/';
        }

        // get user data from db
        let x = {
            username: 'Super User'+userId,
            userTag: '@sudo'+userId,
            profileImage: 'https://picsum.photos/id/'+userId+'/200',
            dateOfBirth: new Date(2021 - userId, userId % 12, 1).toDateString(),
            location: 'Planet Earth',
            userBio: 'This is my user bio. Recheeps are not endorsements! Recheep at your own discretion!',
            followerCount: 0,
            followingCount: 12,
            cheepFeedHeader: 'User\'s Cheeps',
            props: [
                {
                    profileImage: 'https://picsum.photos/id/23/200',
                    handle: '@realDonaldTrump',
                    heading: 'My Button is Bigger than Yours',
                    body: 'North Korean'
                },
                {
                    profileImage: 'https://picsum.photos/id/23/200',
                    handle: '@realDonaldTrump',
                    heading: 'Nominate Me!',
                    body: 'Lowest rated Oscars in HISTORY. Problem is, we don\'t have Stars anymore - except your President (just kidding, of course)!'
                },
                {
                    profileImage: 'https://picsum.photos/id/23/200',
                    handle: '@realDonaldTrump',
                    heading: 'Nominate Me!',
                    body: 'Lowest rated Oscars in HISTORY. Problem is, we don\'t have Stars anymore - except your President (just kidding, of course)!'
                }
            ]
        };

        // assign data to view
        Profile.setData(x);

    },

});
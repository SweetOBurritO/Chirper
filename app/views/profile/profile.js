import {View} from '../view.js';
import {Trends} from '../../components/trends/trends.js';

export const Profile = View({
    path: '/views',
    name: 'profile',
    title: 'Profile',

    data: {
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
                },
                {
                    message: 'Giga Berlin suppliers please accelerate!'
                },
                {
                    message: 'Aiming for extreme precision with next gen Model Y – microns, not millimeters'
                },
                {
                    message: 'Ambitious short-term goals like this are critical to moving closer to a net-zero future. As we rapidly scale the solutions we have, we must also invest in innovation to reach our ultimate goals. Thank you for your leadership.'
                },
                {
                    message: 'The amount of cement China has consumed is a staggering statistic and reminder of how much emissions have grown in low- and middle-income countries. (Minecraft concrete doesn’t count, though server farms are responsible for a lot of emissions.)'
                }
            ]
        };

        // assign data to view
        Profile.setData(x);

    },

});
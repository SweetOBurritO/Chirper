import { Cheep } from '../../components/cheep/cheep.js';
import {Trends} from '../../components/trends/trends.js';
import {View} from '../view.js';


export const Home = View({
    name: 'home',
    title: 'Home',


    data: {
        cheep: Cheep,
        trends: Trends,
        promptCheep: 'Cheep, Cheep!',
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

    },

});

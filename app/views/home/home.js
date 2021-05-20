import { Cheep } from '../../components/cheep/cheep.js';
import {View} from '../view.js';


export const Home = View({
    name: 'home',
    title: 'Home',


    data: {
        cheep: Cheep,
        props: [
            {
                handle: '@realDonaldTrump',
                heading: 'My Button is Bigger than Yours',
                body: 'North Korean'
            },
            {
                handle: '@realDonaldTrump',
                heading: 'Nominate Me!',
                body: 'Lowest rated Oscars in HISTORY. Problem is, we don\'t have Stars anymore - except your President (just kidding, of course)!'
            },
            {
                handle: '@realDonaldTrump',
                heading: 'Nominate Me!',
                body: 'Lowest rated Oscars in HISTORY. Problem is, we don\'t have Stars anymore - except your President (just kidding, of course)!'
            }
        ]

    },

});

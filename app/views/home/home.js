import { Cheep } from '../../components/cheep/cheep.js';
import {View} from '../view.js';


export const Home = View({
    name: 'home',
    title: 'Home',


    data: {
        cheep: Cheep,
        props: [
            {
                imageSrc: 'https://images.newrepublic.com/4aa3c4e7c6c23682dff17fd422749bcd840a822b.jpeg?w=1024&h=512&crop=faces&fit=crop&fm=jpg',
                handle: '@realDonaldTrump',
                heading: 'My Button is Bigger than Yours',
                body: 'North Korean Leader Kim Jong Un just stated that the "Nuclear Button is on his desk at all times." Will someone from his depleted and food starved regime please inform him that I too have a Nuclear Button, but it is a much bigger & more powerful one than his, and my Button works!'
            },
            {
                imageSrc: 'https://images.newrepublic.com/4aa3c4e7c6c23682dff17fd422749bcd840a822b.jpeg?w=1024&h=512&crop=faces&fit=crop&fm=jpg',
                handle: '@realDonaldTrump',
                heading: 'Nominate Me!',
                body: 'Lowest rated Oscars in HISTORY. Problem is, we don\'t have Stars anymore - except your President (just kidding, of course)!'
            },
            {
                imageSrc: 'https://images.newrepublic.com/4aa3c4e7c6c23682dff17fd422749bcd840a822b.jpeg?w=1024&h=512&crop=faces&fit=crop&fm=jpg',
                handle: '@realDonaldTrump',
                heading: 'Nominate Me!',
                body: 'Lowest rated Oscars in HISTORY. Problem is, we don\'t have Stars anymore - except your President (just kidding, of course)!'
            }
        ]

    },

});

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
        props: []
    },

    async onLoad(){
        const response = await fetch('/api/cheeps');
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

        Home.setData({
            props:cheeps
        });

        const router = window.getRouter();

        router.updateHtml(Home, {path:'/home'});

    }

});

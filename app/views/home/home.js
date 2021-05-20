import { Cheep } from '../../components/cheep/cheep.js';
import {View} from '../view.js';

let incr = 0;
export const Home = View({
    name: 'home',
    title: 'Home',


    data: {
        cheep: Cheep,
        props:  {
                handle: '@realDonaldTrump',
                heading: 'My Button is Bigger than Yours',
                body: 'North Korean',
            }

    },
    methods:{
        onClicked: ()=>{
        }
    }

});

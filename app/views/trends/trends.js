import {View} from '../view.js';

export const Trends = View({
    path: '/views',
    name: 'trends',
    title: 'Trends',

    data: {
      trends : [
        {
            hashTag: '#covid19',
        },
        {
            hashTag: '#covidvaccines',
        },
        {
            hashTag: '#globalwarming',
        },
        {
            hashTag: '#bitcoin',
        },
        {
            hashTag:  '#spiderman',
        },
        {
            hashTag:  '#superman',
        }
      ]
    },

});
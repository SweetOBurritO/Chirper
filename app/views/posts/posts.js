import {View} from '../view.js';

export const Posts = View({
    path: '/views',
    name: 'posts',
    title: 'Posts',

    data: {
        showMe: true,
        dontShowMe: true,
        posts : [
            {
                heading: 'Donald J. Trump',
                message: 'An \'extremely credible source\' has called my office and told me that @BarackObama\'s birth certificate is a fraud'
            },
            {
                heading: 'Donald J. Trump',
                message: 'Despite the constant negative press covfefe'
            },
            {
                heading: 'Donald J. Trump',
                message: 'Despite the constant negative press covfefe'
            }
        ]
    }

});
import { databinding } from './databinding.js';
import {View} from './views/view.js';

export const Component = (obj) => {
    const view = View(obj);

    let clearPropEvents = ()=> {};
    let clearDataEvents = ()=> {};


    return {
        ...view,
        getHtml: async (props) => {

            let htmlDom = await view.fetchHtml(`/components/${obj.name}/${obj.name}.html`);
            if(props === undefined || props === null)
            {
                clearDataEvents = await databinding({_data: view.data, _methods: view.methods},  htmlDom);
                return htmlDom;
            }

            let propMethods = Object.keys(props).filter(key => {
                return key.toString().startsWith('on');
            });
             clearPropEvents = await databinding({_data:props, propMethods}, htmlDom);
             clearDataEvents = await databinding({_data: view.data, _methods: view.methods},  htmlDom);

            return htmlDom;
        },
        getCssPath: async () => {
            const cssPath = `/components/${obj.name}/${obj.name}.css`;
            return cssPath;
        },
        onExit: () => {

            clearPropEvents();
            clearDataEvents();
            if(view.onExit === undefined)
                return;
            view.onExit();
        },
    };

};
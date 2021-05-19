import Observable from '../observable.js';
import {databinding} from '../databinding.js';


export const View = (view) => {

    const _data = {};
    const _methods = {...view.methods};

    const recursiveSetData = (obj, dataObj) =>
    {
        Object.keys(obj).forEach( key => {

            if (typeof obj[key] === 'object' && obj[key] !== null)
            {
                if(dataObj[key] !== undefined)
                {
                    recursiveSetData(obj[key], dataObj[key]);
                    return;
                }

                if(Array.isArray(obj[key]))
                    dataObj[key] = [];
                else
                    dataObj[key] = {};

                recursiveSetData(obj[key], dataObj[key]);
                return;
            }

            if(dataObj[key] !== undefined)
            {
                dataObj[key].value = obj[key];
                return;
            }

            dataObj[key] = new Observable(obj[key]);
            return;

        });
    };

    const setData = (obj) => {
        recursiveSetData(obj, _data);
    };

    const fetchHtml = async (path) =>{
        const response = await fetch(path);
        const html = await response.text();
        const parser = new DOMParser();
        const domModel = await parser.parseFromString(html, 'text/html');
        const template = domModel.getElementsByTagName('template')[0];
        return template.content.cloneNode(true);
    };

    const setTitle =  () =>{
        document.title = view.title;
    };

    view.setData = setData;
    let clearEventBindings = () => {};



    if(view.data !== undefined){
        setData(view.data);
    }

    return {
        fetchHtml: fetchHtml,
        setData: setData,
        componentCss: [],

        onLoad(){
            this.componentCss = [];
            setTitle();
            if(view.onLoad === undefined)
                return;
            view.onLoad();
        },
        onExit(){
            clearEventBindings();
            if(view.onExit === undefined)
                return;
            view.onExit();
        },

        get data(){
            return _data;
        },

        get methods(){
            return _methods;
        },

        async getHtml(){
            const htmlDom = await fetchHtml(`/views/${view.name}/${view.name}.html`);
            clearEventBindings = await databinding({_data , _methods, view }, htmlDom, this);
            this.componentCss.forEach(link => htmlDom.appendChild(link));
            return htmlDom;
        },
        getCssPath: async () => {
            const cssPath = `/views/${view.name}/${view.name}.css`;
            return cssPath;
        }
    };
};
export const Router = (initialRoutes) => {

    const routes = initialRoutes || [];
    const defaultRoute = initialRoutes === [] ?
    { route: '/', view: { getHTML: () => '<h1> No Routes Defined </h1>' }}:
    routes[0];
    let activeRoute = {};

    const getMatch = () => {
        return routes.find( route => route.path === location.pathname) || defaultRoute;
    };

    const navigateTo = (url) => {
        history.pushState(null, null, url);
        routeToPath(url);
    };

    const updateHtml = async (view)=> {

        const newNode = await view.getHtml();

        document.querySelector('#app').innerHTML = '';
        document.querySelector('#app').appendChild(newNode);
        document.querySelector('#view-styles').href = await view.getCssPath();

    };

    const routeToPath = async () => {

        const route = getMatch();
        const view = route.view;
        const currentPath = activeRoute.route ?? '' ;

        if(route.path === currentPath){
            return;
        }
        activeRoute.view && activeRoute.view.onExit();
        activeRoute = route;
        await updateHtml(view);
        view.onLoad();

        if(location.pathname  !== route.path){
            routeToPath();
        }
    };
    window.addEventListener('popstate', routeToPath);

    document.addEventListener('DOMContentLoaded', () => {
        document.body.addEventListener('click', e=> {
            if(e.target.matches('[data-link]')){
                e.preventDefault();

                navigateTo(e.target.href);
            }
        });
        routeToPath(); });

    return {
        addRoute: (route) => {
            routes.push(route);
        },
        navigateTo: navigateTo
    };
};
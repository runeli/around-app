import * as React from 'react';
import LocationActivatorPane from './LocationActivatorPane';
import LeafletMap from './LeafletMap';
import PostMessageView from './PostMessageView';

const DEFAULT_ROUTE = 'DEFAULT_ROUTE';
const INITIAL_ROUTE = '/index';
var RouterElement = null;

class RouteStack {

    constructor() {
        this._stack = [INITIAL_ROUTE];
    }

    push(value) {
        return this._stack.push(value);
    }

    pop() {
        return this._stack.pop();
    }

    length() {
        return this._stack.length;
    }

    peek() {
        return this._stack[this._stack.length - 1];
    }

}

class RuneliRouter extends React.Component {

    constructor(props, context) {
        super();
        this.state = {
            activeView: this._getRouteFromHashOrReturnFalseIfNoRoutePresent() || INITIAL_ROUTE
        };
        this.routes = new Map();
        this.initializeRoutes();
        this.routesStack = new RouteStack();
        RouterElement = this;
        this.routeChangeHandlers = [];
        
    }

    setRoute(route) {
        this.routesStack.push(route);   
        this.setState({activeView: route});
        this._executeRouteChangeHandlersWhenRouteHasChanged();
    }

    back() {
        this.routesStack.pop();        
        if (this.routesStack.length() === 0) {
            this.routesStack.push(INITIAL_ROUTE);
        }
        this.setState({activeView: this.routesStack.peek()});
        this._executeRouteChangeHandlersWhenRouteHasChanged();
    }

    initializeRoutes() {
        this.routes.set(DEFAULT_ROUTE, DefaultRoute);
        this.routes.set(INITIAL_ROUTE, LocationActivatorPane);
        this.routes.set('/map', LeafletMap);
        this.routes.set('/postMessage', PostMessageView)
    }

    addRouteChangeListener(handlerFunction) {
        this.routeChangeHandlers.push(handlerFunction);
        return this.routeChangeHandlers.length - 1;
    }

    removeRouteChangeListerner(indexOfHandler) {
        this.routeChangeHandlers.splice(indexOfHandler, 1);
    }

    _executeRouteChangeHandlersWhenRouteHasChanged() {
        this.routeChangeHandlers.forEach(handler => {
            handler(this.state.activeView);
        });
    }

    _getRouteFromHashOrReturnFalseIfNoRoutePresent() {
        const hash = window.location.hash;
        const trimmedHashContainingOnlyTheFirstRoute = hash.substr(1);
        const firstRoute = trimmedHashContainingOnlyTheFirstRoute.split("/").filter(route => route.length > 0)[0];
        if(!firstRoute) {
            return false;
        } else {
            return '/' + firstRoute;
        }
    }

    render() {
        let maybeComponent = this.routes.get(this.state.activeView);
        if(!maybeComponent) {
            return React.createElement(this.routes.get(DEFAULT_ROUTE), {routeNotFound: this.state.activeView});
        } else {
            return React.createElement(this.routes.get(this.state.activeView));
        }    
    }

}

class DefaultRoute extends React.Component {
    render() {
        return (<span>No route found: {this.props.routeNotFound}</span>);
    }
}
var _SingletonRouter = null;
export default {
    singletonRouter: function() {
        if(!_SingletonRouter) {
            _SingletonRouter = React.createElement(RuneliRouter)
        } 
        return _SingletonRouter;
    },
    setRoute: function(route) {
        if(RouterElement)
            RouterElement.setRoute(route)
    },
    back: function() {
        if(RouterElement) {
            RouterElement.back();
        }
    },
    hasRoutesToGoBackTo: function() {
        if(RouterElement && RouterElement.routesStack._stack) {
            return RouterElement.routesStack._stack.length > 1;
        } else {
            return false;
        }
    },
    onRouteChange: function (handlerFunction) {
        return RouterElement.addRouteChangeListener(handlerFunction);
    },
    offRouteChange: function (handlerFuctionIndex) {
        return RouterElement.removeRouteChangeListerner(handlerFuctionIndex);
    }
};
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

}

class RuneliRouter extends React.Component {

    constructor(props, context) {
        super();
        this.state = {
            activeView: INITIAL_ROUTE
        };
        this.routes = new Map();
        this.initializeRoutes();
        this.routesStack = new RouteStack();
        RouterElement = this;
    }

    setRoute(route) {
        this.routesStack.push(route);   
        this.setState({activeView: route});
    }

    back() {
        let newRoute = this.routesStack.pop();        
        if (newRoute === this.state.activeView && this.routesStack.length() > 0) {
            newRoute = this.routesStack.pop();
        }
        if (this.routesStack.length() === 0) {
            this.routesStack.push(INITIAL_ROUTE);
        }
        this.setState({activeView: newRoute});
    }

    initializeRoutes() {
        this.routes.set(DEFAULT_ROUTE, DefaultRoute);
        this.routes.set(INITIAL_ROUTE, LocationActivatorPane);
        this.routes.set("/map", LeafletMap);
        this.routes.set('/postMessage', PostMessageView)
    }

    getComponent() {
        let maybeComponent = this.routes.get(this.state.activeView);
        if(!maybeComponent) {
            return React.createElement(this.routes.get(DEFAULT_ROUTE), {routeNotFound: this.state.activeView});
        } else {
            return React.createElement(this.routes.get(this.state.activeView));
        }
    }

    render() {
        return this.getComponent();
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
        if(_SingletonRouter)
            RouterElement.setRoute(route)
    },
    back: function() {
        if(_SingletonRouter) {
            RouterElement.back();
        }
    }
};
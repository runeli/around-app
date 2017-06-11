import AppBar from 'material-ui/AppBar';
import React from 'react'
import NavigationBackSvgIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ActionHomeSvgIcon from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

const style = {
    position: 'absolute',
    top: 0
};

class AroundBar extends React.Component {

    componentDidMount() {
        /*
        this._handlerIndex = RuneliRouter.onRouteChange(routeValue => {
            this.forceUpdate();
        });
        */
    }

    componentWillUnmount() {
        //RuneliRouter.offRouteChange(this._handlerIndex);
    }

    _handleBackButtonClick() {
        this.context.router.history.goBack()
    }

    _getCurrentIconOrEmptyIfNoRoutesArePresent() {
        if(this.context.router.route.location.pathname === "/") {
            return <IconButton><ActionHomeSvgIcon /></IconButton>
        }
        return <IconButton><NavigationBackSvgIcon /></IconButton>
    }

    render() {
        return (
            <div>
               <AppBar 
                title="Around" 
                style={style} 
                iconElementLeft={this._getCurrentIconOrEmptyIfNoRoutesArePresent()}
                onLeftIconButtonTouchTap={this._handleBackButtonClick.bind(this)}
               /> 
            </div>
        );
    }
}

AroundBar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default AroundBar;
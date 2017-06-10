import AppBar from 'material-ui/AppBar';
import React from 'react'
import RuneliRouter from './RuneliRouter';
import NavigationBackSvgIcon from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

const style = {
    position: 'absolute',
    top: 0
};

class AroundBar extends React.Component {

    componentDidMount() {
        this._handlerIndex = RuneliRouter.onRouteChange(routeValue => {
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        RuneliRouter.offRouteChange(this._handlerIndex);
    }

    _handleBackButtonClick() {
        RuneliRouter.back();
    }

    _getCurrentIconOrEmptyIfNoRoutesArePresent() {
        console.log('rendering!!')
        return RuneliRouter.hasRoutesToGoBackTo() ? <IconButton><NavigationBackSvgIcon /></IconButton> : <IconButton />
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
export default AroundBar;
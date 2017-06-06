import AppBar from 'material-ui/AppBar';
import React from 'react'
import RuneliRouter from './RuneliRouter';

const style = {
    position: 'absolute',
    top: 0
};

class AroundBar extends React.Component {

    _handleBackButtonClick() {
        RuneliRouter.back();
    }

    render() {
        return (
            <div>
               <AppBar 
                title="Around" 
                style={style} 
                showMenuIconButton={true} 
                onLeftIconButtonTouchTap={this._handleBackButtonClick.bind(this)}
               /> 
            </div>
        );
    }
}
export default AroundBar;
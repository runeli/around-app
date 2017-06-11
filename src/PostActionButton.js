import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RuneliRouter from './RuneliRouter';

class PostActionButton extends React.Component {

    _handleButtonClick() {
        RuneliRouter.setRoute('/postMessage');
    }

    render() {
        const style = {
            position: 'absolute',
            bottom: 40,
            right: 40
        };
        return (
            <div>
                <FloatingActionButton style={style} onClick={this._handleButtonClick.bind(this)}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}


export default PostActionButton;
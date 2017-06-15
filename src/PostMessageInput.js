import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostMessageInput extends Component {

    componentDidMount() {
        this.postMessageInput.input.addEventListener('keyup', this._handleEnterPress.bind(this));
    }

    componentWillUnmount() {
        this.postMessageInput.input.removeEventListener('keyup', this._handleEnterPress.bind(this));
    }

    _handleEnterPress(event) {
        if(event.keyCode === 13)
            this._handleAroundAdd();
    }

    _handleAroundAdd() {
        this.props.onAroundAdd(this.postMessageInput.input.value);
        this.postMessageInput.input.value = '';
    }

    render() {
        return (
            <div className="input-container-new-message-container">
                <TextField 
                    className="float-left post-message-input-new-message flex-grow" 
                    hintText="Whats on your mind?" 
                    ref={postMessageInput => {this.postMessageInput = postMessageInput;}}
                    />
                <RaisedButton 
                    label="POST" 
                    className="post-message-post-button" 
                    onClick={this._handleAroundAdd.bind(this)}                
                />
            </div>
        );
    }
}

export default PostMessageInput;
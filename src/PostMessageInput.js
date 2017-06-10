import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostMessageInput extends Component {

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
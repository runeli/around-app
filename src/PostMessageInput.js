import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostMessageInput extends Component {

    render() {
        return (
            <div className="input-container-new-message-container">
                <TextField className="float-left post-message-input-new-message flex-grow" hintText="Hint Text" />
                <RaisedButton label="POST" className="post-message-post-button" onClick={this.props.onAroundAdd}/>
            </div>
        );
    }
}

export default PostMessageInput;
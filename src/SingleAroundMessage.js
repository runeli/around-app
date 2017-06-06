import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


class SingleAroundMessage extends Component {
    render() {
        return (
            <div className="around-message-container">
                <div className="flex-grow around-message">{this.props.messageText}</div>
                <FloatingActionButton disabled={true} className="around-message-vote-button">
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default SingleAroundMessage;
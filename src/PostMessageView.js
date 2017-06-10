import React, { Component } from 'react';
import PostMessageInput from './PostMessageInput';
import AroundsList from './AroundsList';

class PostMessageView extends Component {

    handleAroundAdd() {
        this.aroundList.addAroundMessage({messageBody: 'this was added'})
    }

    render() {
        return (
            <div className="post-message-view-wrapper">
                <AroundsList ref={(aroundList) => { this.aroundList = aroundList; }}/>
                <PostMessageInput onAroundAdd={this.handleAroundAdd.bind(this)}/>
            </div>
        );
    }
}

export default PostMessageView;
import React, { Component } from 'react';
import PostMessageInput from './PostMessageInput';
import AroundsList from './AroundsList';

class PostMessageView extends Component {

    handleAroundAdd() {
        console.log('!!!!!!!')
        this.aroundList.addAroundMessage({messageText: 'this was added'})
    }

    render() {
        return (
            <div>
                <AroundsList ref={(aroundList) => { this.aroundList = aroundList; }}/>
                <PostMessageInput onAroundAdd={this.handleAroundAdd.bind(this)}/>
            </div>
        );
    }
}

export default PostMessageView;
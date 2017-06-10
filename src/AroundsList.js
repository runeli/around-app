import React, { Component } from 'react';
import SinlgeAroundMessage from './SingleAroundMessage';
import update from 'react-addons-update';
import HttpClient from './HttpClient';
import ApplicationStateStore from './ApplicationStateStore';

class AroundsList extends Component {

    constructor() {
        super();
        this.state = {
            msgs: []
        }
    }

    addAroundMessage(messageObject) {
        let updateTo = {
            msgs: {
                $push: [messageObject]
            }
        };        
        this.setState(update(this.state, updateTo));
        this._scrollToBottomOfThisList();
        ApplicationStateStore.helpers().appendSingleAround(messageObject);
    }

    _addInitialArounds(messageObjects) {
        let updateTo = {
            msgs: {
                $push: messageObjects
            }
        };
        this.setState(update(this.state, updateTo));
    }

    _scrollToBottomOfThisList() {
        this.listWrapper.parentNode.scrollTop = this.listWrapper.scrollHeight;
    }

    async componentDidMount() {
        let arounds = await HttpClient.getArounds();
        this._addInitialArounds(arounds);
    }

    getMessages() {
        return this.state.msgs.map(msgObject => <SinlgeAroundMessage messageBody={msgObject.messageBody} key={msgObject.id}/>)
    }

    render() {
        return (
            <div className="post-message-list-wrapper" ref={listWrapper => {this.listWrapper = listWrapper;}}>
                {this.getMessages()}
            </div>
        );
    }
}

export default AroundsList;
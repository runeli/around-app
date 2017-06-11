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
        this._scrollToBottomOfThisList();        
    }

    _addInitialArounds(messageObjects) {
        let updateTo = {
            msgs: messageObjects
        };
        this.setState(updateTo);
    }

    _scrollToBottomOfThisList() {
        this.listWrapper.parentNode.scrollTop = this.listWrapper.scrollHeight;
    }

    async componentDidMount() {
        let arounds = await HttpClient.getArounds();
        this._addInitialArounds(arounds);
        this.stateChangeListernerCallbackId = ApplicationStateStore.addStateChangeListener(state => {
            let updateTo = {
                msgs: state.aroundCache.arounds
            };
            this.setState(updateTo);
            this._scrollToBottomOfThisList();
        });
    }

    componentWillUnmount() {
        ApplicationStateStore.removeStateChangeListerner(this.stateChangeListernerCallbackId);
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
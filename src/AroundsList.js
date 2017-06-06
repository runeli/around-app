import React, { Component } from 'react';
import SinlgeAroundMessage from './SingleAroundMessage';
import update from 'react-addons-update';

class AroundsList extends Component {

    constructor() {
        super();
        this.state = {
            msgs: [
                {messageText: 'this is an around message :)'},
                {messageText: 'this is an around message :)'},
                {messageText: 'this is an around message :)'}
            ]
        }
    }

    addAroundMessage(messageObject) {
        this.setState(update(this.state, {
            msgs: {$push:[messageObject]}
        }));
    }

    getMessages() {
        return this.state.msgs.map(msgObject => <SinlgeAroundMessage messageText={msgObject.messageText}/>)
    }

    render() {
        return (
            <div>
                {this.getMessages()}
            </div>
        );
    }
}

export default AroundsList;
import React, { Component } from 'react';
import PostMessageInput from './PostMessageInput';
import AroundsList from './AroundsList';
import LocationService from './LocationService';
import io from 'socket.io-client';

const IO_CLIENT_TO_SERVER_MESSAGE = 'aroundMessageClientToServer';
const IO_SERVER_TO_CLIENT_MESSAGE = 'aroundMessageServerToClient';

class PostMessageView extends Component {

    constructor() {
        super();
        console.log('postMessageViewConstructed');
        this.io = io('https://localhost:8080');                
    }

    componentDidMount() {
        this._bindEventHandlers();
    }

    componentWillUnmount() {
        this._unbindEventHandlers();
    }

    _bindEventHandlers() {
        this.io.on(IO_SERVER_TO_CLIENT_MESSAGE, this.aroundList.addAroundMessage);
    }

    _unbindEventHandlers() {
        this.io.removeAllListeners(IO_CLIENT_TO_SERVER_MESSAGE);
        this.io.removeAllListeners(IO_SERVER_TO_CLIENT_MESSAGE);
    }

    async handleAroundAdd(messageBody) {
        const coords = await LocationService.getCurrentLocation();
        const aroundMessage = {
            messageBody, 
            location: {
                lat: coords.coords.latitude, 
                lng: coords.coords.longitude
            }, 
            date: new Date(), 
            id: (new Date()).getTime().toString()
        };
        
        this.io.emit('aroundToServerMessage', aroundMessage);
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
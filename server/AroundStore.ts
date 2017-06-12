import {AroundMessage} from './AroundMessage';

export default class AroundStore {
    
    private messages: AroundMessage[] = [];

    add(message: AroundMessage) {
        this.messages.push(message);
    }

    cleanAll(): void {
        this.messages = [];
    }

    get(count?: number): AroundMessage[] {
        if(count) {
            return this.messages.splice(count);
        } else {
            return this.messages;
        }
    }

}
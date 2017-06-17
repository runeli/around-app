import {AroundMessage, AroundMessageLocation} from './AroundMessage';

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

    isMessageValid(message: AroundMessage): boolean {
        if(this.isMessageBodyValid(message.messageBody) && this.isAroundMessageLocationValid(message.location)){
            return true;
        } else {
            return false;
        }
    }

    private isAroundMessageLocationValid(location: AroundMessageLocation) : boolean {
        /*
        The valid range of latitude in degrees is -90 and +90 for the southern and northern hemisphere respectively. 
        Longitude is in the range -180 and +180 specifying coordinates west and east of the Prime Meridian, respectively.
        */
        if(location.lat < -90 || location.lat > 90) {
            return false;
        }
        if(location.lng < -180 || location.lat > 180) {
            return false;
        }
        return true;
    }

    private isMessageBodyValid(messageBody: string): boolean {
        if(messageBody.length > 240) {
            console.warn("message body length exceeds 240 character limit");
            return false;
        }
        if(messageBody.length === 0) {
            console.warn("message body length is zero");
            return false;
        }
        return true;
    }



}
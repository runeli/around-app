import AroundStore from "./AroundStore";

export interface AroundMessageLocation {
    lat: number;
    lng: number;
}

export interface IAroundMessage {
    messageBody: string;
    location: AroundMessageLocation;
    id: MessageId;
    date: Date;
}

export interface MessageId {
    messageId: string;
}

export class AroundMessage implements IAroundMessage {
    messageBody: string;
    location: AroundMessageLocation;
    id: MessageId;
    date: Date;
    public static fromJsonLike(obj: IAroundMessage, idGenerator: (aroundStore: AroundStore) => MessageId, aroundStore: AroundStore): AroundMessage {
        let aroundMessage = new AroundMessage();
        aroundMessage.date = new Date(obj.date);
        aroundMessage.location = obj.location;
        aroundMessage.messageBody = obj.messageBody;
        aroundMessage.id = idGenerator(aroundStore);
        return aroundMessage;
    }
    
    public toString(): string {
        return this.id.messageId;
    }
}
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
    public static fromJsonLike(obj: IAroundMessage): AroundMessage {
        let aroundMessage: AroundMessage = obj;
        aroundMessage.date = new Date(obj.date);
        return aroundMessage;
    }

    public toString(): string {
        return this.id.messageId;
    }
}
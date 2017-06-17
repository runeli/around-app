
export interface AroundMessageLocation {
    lat: number;
    lng: number;
}
export interface IAroundMessage {
    messageBody: string;
    location: AroundMessageLocation;
    id: string;
    date: Date;
}

export class AroundMessage implements IAroundMessage {
    messageBody: string;
    location: AroundMessageLocation;
    id: string;
    date: Date;
    public static fromJsonLike(obj: IAroundMessage): AroundMessage {
        let aroundMessage: AroundMessage = obj;
        aroundMessage.date = new Date(obj.date);
        return aroundMessage;
    }
}
import * as express from 'express';
import {ApiRoute} from './ApiRoute';
import {AroundMessage} from './AroundMessage';
import * as https from 'https';
import * as net from 'net';
import * as socketIo from "socket.io";
import * as fs from 'fs';
import * as path from 'path';
import AroundMessageStore from './AroundStore';

const CLIENT_TO_SERVER_MESSAGE = 'clientToServerMessage';
const SERVER_TO_CLIENT_MESSAGE = 'aroundToClientMessage';
const INITIAL_AROUNDS = 'initialArounds';

export class AroundServer {
    aroundMessageStore: AroundMessageStore;
    io: SocketIO.Server;
    server: net.Server;
    private readonly port: number = 8080;
    public app: express.Express;

    constructor() {
        this.app = express();
        this.initializeRoutes();
        this.createServer();
        this.sockets();
        this.listen();
        this.aroundMessageStore = new AroundMessageStore();
    }

    private initializeRoutes(): void {
        const router: express.Router = express.Router();
        ApiRoute.create("/api", router);
        this.app.use(router);
    }

    private createServer(): void {
        const httpsOptions: https.ServerOptions = {
            key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert.pem'))
        }
        this.server = https.createServer(httpsOptions, this.app);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Started Around server on port: %s', this.port);
        });

        this.io.on('connect', (socket: SocketIO.Socket) => {
            console.log('Connected: %s', socket.id);
            socket.emit(INITIAL_AROUNDS, this.aroundMessageStore.get());
            socket.on(CLIENT_TO_SERVER_MESSAGE, (_message: AroundMessage) => {
                let message = AroundMessage.fromJsonLike(_message, this.aroundMessageStore.getUniqueMessageId());
                console.log(message);
                if(!this.aroundMessageStore.isMessageValid(message)) {                    
                    return;
                }
                this.aroundMessageStore.add(message);
                socket.broadcast.emit(SERVER_TO_CLIENT_MESSAGE, );
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }
}
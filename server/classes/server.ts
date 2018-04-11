import * as express from 'express';
import { CustomRouter } from './router';
import { DEFAULT_PORT } from '../../config';


export class Server {

    constructor() {
        //
    }

    public start(port?: number) {
        let usedPort = port || DEFAULT_PORT;
        var app = express();
        var customRouter: CustomRouter = new CustomRouter(app);
        app.listen(usedPort, () => {
            console.log('listening on port 5001');
            console.log(`request url: http://localhost:${usedPort}`);
        });
    }
}
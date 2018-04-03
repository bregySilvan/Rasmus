import * as express from 'express';
import { CustomRouter } from './router';



export class Server {
    
    constructor() {
        //
    }

    public start(port?: number) {
        let usedPort = port || 5001;
        var app = express();
        var customRouter: CustomRouter = new CustomRouter(app);
        app.listen(usedPort, () => {
            console.log('listening on port 5001');
        });
    }
}
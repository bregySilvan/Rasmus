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
            console.log(`listening on port ${usedPort}`);
            console.log(`request url: http://localhost:${usedPort}`);
            console.log('## active locations');
            customRouter.activeLocations.sort().forEach((location: string) => {
                console.log(location);
            });
        });
    }
}
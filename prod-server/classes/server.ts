import * as express from 'express';
import { CustomRouter } from './router';
import { DEFAULT_PORT } from '../../config';
import { SOURCE_FOLDER_PATH } from '../prod-server.conf';


export class Server {

    constructor() {
        //
    }

    public start(port?: number) {
        let usedPort = port || DEFAULT_PORT;
        var app = express();
        var customRouter: CustomRouter = new CustomRouter(app);
        customRouter.activatePictureRoutes(SOURCE_FOLDER_PATH);
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
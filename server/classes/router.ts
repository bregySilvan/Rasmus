import * as express from 'express';
import { locations } from '../../config';
import { RequestHandlerService } from '../services/request-handler-service';
import { DataService } from '../services/data-service';

export class CustomRouter {

    private router: express.Router;
    private requestHandler: RequestHandlerService;
    private dataService: DataService;

    constructor(private app: express.Express) {
        this.app = this.app || express();
        this.router = express.Router();
        this.requestHandler = new RequestHandlerService();
        this.dataService = new DataService();
        this.activateRoutes();
        this.app.use(this.router);
    }

    activateRoutes() {
        this.router.post(locations.element,
            (req: express.Request, res: express.Response, next: express.NextFunction) => {
                //    res.end('hello');
                //   next();
                this.dataService.saveElement(req.query, (error: any) => {
                    let message, status;
                    // = ;
                    console.log('error', error);
              //      console.log(req);
                    console.log('req.quey: ', JSON.stringify(req.query));
                    // pls check response status since they are probably wrong
                    status = error ? 404 : 200;
                    message = error ? error : 'saving element successfull';
                    res.status(status);
                    res.end(message);
                });
                next();
            });
    }

}


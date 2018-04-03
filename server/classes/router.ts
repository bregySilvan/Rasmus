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
        this.activateRoutes();
        this.app.use(this.router);
    }

    activateRoutes() {
        this.router.post(locations.element, this.requestHandler.onPostElement.bind(this.requestHandler));
        this.router.get(locations.element, this.requestHandler.onGetElement);
    }

}




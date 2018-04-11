import * as express from 'express';
import { locations } from '../../config';
import { RequestHandlerService } from '../services/request-handler-service';
import { DataService } from '../services/data-service';

export class CustomRouter {

    private _router: express.Router;
    private _requestHandler: RequestHandlerService;
    private _dataService: DataService;
    private _activeLocations: string[];

    constructor(private _app: express.Express) {
        this._app = this._app || express();
        this._router = express.Router();
        this._requestHandler = new RequestHandlerService();
        this._activeLocations = [];
        this._activateRoutes();
        this._app.use(this._router);
    }

    get activeLocations(): string[] {
        return this._activeLocations;
    }

    private _activateRoutes() {

        // post
        this._addRoute(locations.element, 'post', this._requestHandler, this._requestHandler.onPostElement);

        // get
        this._addRoute(locations.elements, 'get', this._requestHandler, this._requestHandler.onGetElements);
    }

    private _addRoute(
        location: string,
        method: 'post' | 'get',
        requestHandler: RequestHandlerService,
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(location);
            this._router[method](location, requestHandlerFn.bind(requestHandler));
    }



}




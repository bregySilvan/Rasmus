import * as express from 'express';
import { LOCATIONS } from '../../config';
import { RequestHandlerService } from '../services/request-handler-service';
import { DataService } from '../services/data-service';

export class CustomRouter {

    private _router: express.Router;
    private _requestHandler: RequestHandlerService;
    private _activeLocations: string[];

    constructor(private _app?: express.Express) {
        this._app = _app || express();
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

        // get
        this._addRoute(LOCATIONS.show, 'get', this._requestHandler.onGetShow);

    }

    private _addRoute(location: string, method: 'post' | 'get', 
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(`${method.toUpperCase()}: ${location}`);
            this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    }



}




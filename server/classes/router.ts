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

        // post
        this._addRoute(LOCATIONS.elements, 'post', this._requestHandler.onPostElements);

        this._addRoute(LOCATIONS.boards, 'post', this._requestHandler.onPostElements)

        // get
        this._addRoute(LOCATIONS.elements, 'get', this._requestHandler.onGetElements);

        this._addRoute(LOCATIONS.boards, 'get', this._requestHandler.onGetBoards);

        this._addRoute(LOCATIONS.isAlive, 'get', this._requestHandler.onGetIsAlive);
    }

    private _addRoute(location: string, method: 'post' | 'get', 
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(`${method.toUpperCase()}: ${location}`);
            this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    }



}




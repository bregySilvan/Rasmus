import * as express from 'express';
import { LOCATIONS } from '../../config';
import { RequestHandlerService } from '../services/request-handler-service';
import { DataService } from '../services/data-service';

export class CustomRouter {

    private _router: express.Router;
    private _requestHandler: RequestHandlerService;
    private _activeLocations: string[];
    private _dataService: DataService;

    constructor(private _app?: express.Express) {
        this._app = _app || express();
        this._router = express.Router();
        this._requestHandler = new RequestHandlerService();
        this._activeLocations = [];
        this._activateRoutes();
        this._app.use(this._router);
        this._dataService = new DataService();
    }

    get activeLocations(): string[] {
        return this._activeLocations;
    }

    private _activateRoutes() {

        // get

        this.addRoute(LOCATIONS.scripts, 'get', this._requestHandler.onGetScripts);

        this.addRoute(LOCATIONS.pictureRoutes, 'get', this._requestHandler.onGetPictureRoutes);

        this.addRoute(LOCATIONS.show, 'get', this._requestHandler.onGetShow);

        this.addRoute(LOCATIONS.startShow, 'get', this._requestHandler.onStartShow);

        this.addRoute(LOCATIONS.picture_$id, 'get', this._requestHandler.onGetPicture_$id);
    }

    public addRoute(location: string, method: 'post' | 'get',
        requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void): void {

            location = location.startsWith('/') ? location : `/${location}`;
            this._activeLocations.push(`${method.toUpperCase()}: ${location}`);
            this._router[method](location, requestHandlerFn.bind(this._requestHandler));
    }

}




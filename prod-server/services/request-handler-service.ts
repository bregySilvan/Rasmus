import { Request } from 'express';
import { IElement, ElementTypes, IBoard } from '../../interfaces';
import * as express from 'express';
import { DataService } from './data-service';
import * as _ from 'lodash';
import { LOCAL_ADDRESS, DEFAULT_PORT } from '../../config';
import { EventEmitter } from 'events';
import { CustomRouter } from '../classes/router';

export interface IAddLocationPayload {
    location: string;
    method: string;
    requestHandlerFn: (req: express.Request, res: express.Response, next: express.NextFunction) => void;
}
//res.set('Content-Type', 'image/gif');
export class RequestHandlerService {

    private dataService: DataService;
    private activePictureRoutes: string[] = [];

    public constructor(private router: CustomRouter) {
        this.dataService = new DataService();
    }

    private _respond(res: express.Response, responseInfo: { response: any, error?: Error }, responseStati: { bad: number, good: number }, 
                     next: express.NextFunction, headers: string[]) {
        let response, status;
        if (responseInfo.error) {
            status = responseStati.bad;
            response = responseInfo.error;
        } else {
            status = responseStati.good;
            response = responseInfo.response;
        }

        console.log('responding to request: ');
        console.log('status:', status);
        console.log('response: ', response);

        res.header(headers.join(','));
        res.status(200);
        res.write(response);
        res.end();
        
        next();
    }

    public onGetScripts(req: express.Request, res: express.Response, next: express.NextFunction) {
        let message = `function foo() { alert('bar'); }`
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }

    public onGetPicture_$id(req: express.Request, res: express.Response, next: express.NextFunction) {
        let pictureName = '/'+req.params.id;
        let error = null;
        let picturePath = this.activePictureRoutes.find(path => path.substring(path.lastIndexOf('/')) === pictureName);

        if(!picturePath) {
            error = 'PICTURE NOT FOUND::';
        }
        let message = this.dataService.readPicture(picturePath);
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: image/gif'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }

    public onGetPictureRoutes(req: express.Request, res: express.Response, next: express.NextFunction) {
        let message = JSON.stringify(this.activePictureRoutes.map(route => route.substring(route.lastIndexOf('/'))));
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }

    public addPictureRoutes(folder: string) {
        this.dataService.listFileNames(folder, ['.jpg', '.gif', '.png'], (err: any, files: string[]) => {
            files.forEach(file => {
                this.activePictureRoutes.push(`${folder}/${file}`);
            });
        });
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {


        let message = `<html>
        <head>
        <title>Title of the document</title>
        <script src="http://localhost:5001/scripts"></script>
        <script>function onClick() { window.setTimeout(function() { foo(); }, 3000);  }</script>
        </head>
        
        <body>
        
        <p><button onclick="onClick()">click me</button></p>
        <p><img src="http://localhost:5001/picture"</p>

        
        </body>
        
        </html>`
        let responseData = ``;
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        let headers = ['Content-Type: text/html'];
        this._respond(res, responseInfo, responseStati, next, headers);
    }


/*
    // payload: { element: IListElement }
    public onPostElements(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.warn('onPostElementèèèè!!!!!');
        
        // console.warn(req);
        //   console.warn('req.query', JSON.stringify(req.query));
        //   console.warn('req.body', JSON.stringify(req.body));
        //   console.warn('req.params', JSON.stringify(req.params));

        let elements: IElement[] = req.body;
        this.dataService.saveElements(elements, (error: Error) => {
            let responseData = 'saved element Successfully';
            let responseInfo = { response: responseData, error: error };
            let responseStati = { bad: 403, good: 200 };
            this._respond(res, responseInfo, responseStati, next);
        });
    }

    public onGetIsAlive(req: express.Request, res: express.Response, next: express.NextFunction) {
        let responseInfo = { response: { isAlive: true }, error: null };
        let responseStati = { good: 200, bad: 400 };
        this._respond(res, responseInfo, responseStati, next);
    }

    // payload: { keys?: string }
    public onGetElements(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('req.query:: ', req.query);
        let keys: string[] = Object.keys(req.query).map((key) => req.query[key]);
        this.dataService.getElements(keys, (error: Error, elements: IElement[]) => {
            let responseData = elements;
            let responseInfo = { response: responseData, error: error };
            let responseStati = { bad: 403, good: 200 };
            this._respond(res, responseInfo, responseStati, next);
        });
    }

    // payload: { keys?: string }
    public onGetBoards(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('req.query:: ', req.query);
        let keys: string[];
        if (req.query) {
            keys = Object.keys(req.query).map((key) => req.query[key]);
        }
        this.dataService.getBoards(keys, (error: Error, boards: IBoard[]) => {
            let responseData = boards;
            let responseInfo = { response: responseData, error: error };
            let responseStati = { bad: 403, good: 200 };
            this._respond(res, responseInfo, responseStati, next);
        });
    }
}


*/
}

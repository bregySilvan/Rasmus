import { Request } from 'express';
import { IElement, ElementTypes, IBoard } from '../../interfaces';
import * as express from 'express';
import { DataService } from './data-service';
import * as _ from 'lodash';
import { LOCAL_ADDRESS, DEFAULT_PORT } from '../../config';

export class RequestHandlerService {

    private dataService: DataService;

    public constructor() {
        this.dataService = new DataService();
    }

    private _respond(res: express.Response, responseInfo: { response: any, error?: Error }, responseStati: { bad: number, good: number }, next: express.NextFunction) {
        let response, status;
        if (responseInfo.error) {
            status = responseStati.bad;
            response = responseInfo.error;
        } else {
            status = responseStati.good;
            response = responseInfo.response;
        }

        res.header('Content-Type: text/html');

        res.status(200);
        res.write(response);
        res.end();
        console.log('responding to request: ');
        console.log('status:', status);
        console.log('response: ', response);
        next();
    }

    public onGetShow(req: express.Request, res: express.Response, next: express.NextFunction) {
        // locate source path
        // load pictures from source path in array 




        let message = `<html>
        <head>
        <title>Title of the document</title>
        <script>alert('button clicked');</script>
        <script>function onClick() { alert('button clicked'); }</script>
        </head>
        
        <body>
        <p>
        <button onclick="onClick()">click me</button>
        </p>
        </body>
        
        </html>`
        let responseData = ``;
        let responseInfo = { response: message, error: null };
        let responseStati = { bad: 403, good: 200 };
        this._respond(res, responseInfo, responseStati, next);
    }



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




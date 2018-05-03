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
//// Website you wish to allow to connect
//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

// Request methods you wish to allow
//res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
//res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
//res.setHeader('Access-Control-Allow-Credentials', true);
    private _respond(res: express.Response, responseInfo: { response: any, error?: Error }, responseStati: { bad: number, good: number }, next: express.NextFunction) {
        let response, status;
        if (responseInfo.error) {
            status = responseStati.bad;
            response = responseInfo.error;
        } else {
            status = responseStati.good;
            response = responseInfo.response;
        }
        res.set({
            'accept': 'application/json',
            'access-control-allow-origin': 'http://localhost:4200',
            'Access-Control-Allow-Headers': ['X-Requested-With', 'content-type'],
            'Access-Control-Allow-Credentials': true
         //  'Access-Control-Allow-Origin': 'http://localhost:4200',
         // 'Access-Control-Allow-Origin': ['http://127.0.0.1:'+DEFAULT_PORT, 'http://localhost:'+DEFAULT_PORT, 'http://192.168.1.254:'+DEFAULT_PORT],
         // 'Access-Control-Allow-Methods': ['get', 'post'],
         // 'Access-Control-Request-Method': 'POST',
         // 'Access-Control-Allow-Headers':['Content-Type', 'Authorization', 'Origin', 'X-Auth-Token']
         // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',//Origin, Content-Type, X-Auth-Token'
         // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token',
         // 'Access-Control-Request-Headers'
        });

        res.status(200);
        res.json(response);
        res.end();
        console.log('responding to request: ');
        console.log('status:', status);
        console.log('response: ', response);
        next();
    }

    // payload: { element: IListElement }
    public onPostElements(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.warn('onPostElementèèèè!!!!!');
        // console.warn(req);
        //   console.warn('req.query', JSON.stringify(req.query));
        //   console.warn('req.body', JSON.stringify(req.body));
        //   console.warn('req.params', JSON.stringify(req.params));

        let elements: IListElement[] = req.body;
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




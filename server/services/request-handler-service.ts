import { Request } from 'express';
import { IListElement, ElementTypes, IBoard } from '../../interfaces';
import * as express from 'express';
import { DataService } from './data-service';
import * as _ from 'lodash';

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
        res.set({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': ['*'],
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.status(status);
        res.json(response);
        res.end();
        console.log('responding to request: ');
        console.log('status:', status);
        console.log('response: ', response);
        next();
    }

    // payload: { element: IListElement }
    public onPostElement(req: express.Request, res: express.Response, next: express.NextFunction) {
        let listElement: IListElement = req.query;
        this.dataService.saveElement(listElement, (error: Error) => {
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
        this.dataService.getElements(keys, (error: Error, elements: IListElement[]) => {
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
        if(req.query) {
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




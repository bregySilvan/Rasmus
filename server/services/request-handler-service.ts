import { Request } from 'express';
import { IListElement, ElementTypes } from '../../interfaces';
import * as express from 'express';
import { DataService } from './data-service';
import * as _ from 'lodash';

export class RequestHandlerService {

    private dataService: DataService;

    public constructor() {
        this.dataService = new DataService();
    }

    private _respond(res: express.Response, responseInfo: { response: any, error?: Error }, responseStati: { bad: number, good: number}, next: express.NextFunction) {
        let response, status;
        if(responseInfo.error) {
            status = responseStati.bad;
            response = responseInfo.error;
        } else {
            status = responseStati.good;
            response = responseInfo.response;
        }
        res.status(status);
        res.send(response);
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

    // payload: { keys?: string }
    public onGetElements(req: express.Request, res: express.Response, next: express.NextFunction) {
        let keys: string[] = [];
        Object.keys(req.query).forEach((key) => {
            keys.push(req.query[key]);
        });
        console.log('req.query:: ', req.query);
        this.dataService.getElements(keys, (error: Error, elements: IListElement[]) => {
            let responseData = elements;
            let responseInfo = { response: responseData, error: error };
            let responseStati = { bad: 403, good: 200 };
            this._respond(res, responseInfo, responseStati, next);
        });
    }
}




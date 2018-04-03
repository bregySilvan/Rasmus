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

    public onPostElement(req: express.Request, res: express.Response, next: express.NextFunction) {
        let listElement: IListElement = req.query;
        // if( isListElement(listElement)) ... else return err;
        this.dataService.saveElement(req.query, (error: any) => {
            let message, status;
            // pls check response status since they are probably wrong
            if(error) {
                message = JSON.stringify(error);
                status = 403;
            } else {
                status =  200;
                message ='saved element successfully';
            }
            res.status(status);
            res.end(message);
        });
        
    }

    //req: express.Request, res: express.Response, next: express.NextFunction
    public onGetElement(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log('someone wants to have element with key ', req.query);
        res.status(200);
        res.end('sry. NOT implemented');
        next();
    }  
}




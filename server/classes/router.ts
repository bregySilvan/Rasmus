import * as express from 'express';
import { locations } from '../../config';
import { RequestHandlerService } from '../services/request-handler-service';

export class customRouter {
/*
export const locations: ILocationMap = {
    element_$id: '/element/:id',
    elements: 'board',
    board_$id: '/board/:id',
    boards: '/boards',
    activeBoard: '/active-board'
}
*/
    private router: express.Router;
    private requestHandler: RequestHandlerService;
    constructor() {
        this.router = express.Router();
        this.requestHandler = new RequestHandlerService();
    }

    activateRoutes() {
        this.router.post(locations.element,
            (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // save  elements
            let receivedElement = req.query;


        });



    }

}

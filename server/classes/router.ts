import * as express from 'express';
import { locations } from '../../config';

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

    constructor() {
        this.router = express.Router();
    }

    activateRoutes() {
        this.router.post(locations.elements, (req, res, next) => {
            
        }



    }

}

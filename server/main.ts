
import * as _ from 'lodash';
import { Server } from './classes/server';
import { DEFAULT_PORT } from '../config';
//import { IListElement } from '../interfaces';
//import * as fse from 'fs-extra';

//var a: IListElement = { type: 'advertisement', key: 'myFirstFuckingKey'};
//var file = './log.json';
//fse.createFileSync(file);
//fse.writeJsonSync(file, a);
//new Server().start(DEFAULT_PORT);



interface IHost {
    ipAddress: string;
    isAlive: boolean;
}


let currentHosts: IHost[] = [
    {
        ipAddress: '1.1.1.1',
        isAlive: true,
    }

];
let newHosts: IHost[] = [
    {
        ipAddress: '1.1.1.1',
        isAlive: true,
    }

]


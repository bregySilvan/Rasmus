import { Injectable } from '@angular/core';
import { IContainer, ElementTypes } from '../../../../interfaces';
import { KeyService } from './key.service';

@Injectable() 
export class ListService {
    

    constructor() {

    }

    public createContainer(key: string, type: ElementTypes): IContainer {
        return {
            key: key,
            type: 'container',
            elements:[],
            contentType: type
        };
    }

}
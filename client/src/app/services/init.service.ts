import { Injectable } from '@angular/core';
import { KeyService } from './key.service';
import { LogService } from './log.service';
import { ElementService } from './element.service';
import { IElement } from '../../../../interfaces';


@Injectable()
export class InitService {

    constructor(
                private elementService: ElementService,
                private logService: LogService) {

    }

    public registerElement(element: IElement) {
        this.elementService.tryElementsUpdate([element]);
    }

    public log(...text: any[]) {
        this.logService.log(this, ...text);
    }
}
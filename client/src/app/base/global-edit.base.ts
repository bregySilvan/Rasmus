import { IElement } from '../../../../interfaces';
import { Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { InitService } from '../services/init.service';
import { KeyService } from '../services/key.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import { findElement } from '../../utils/functions';
import { LogService } from '../services/log.service';

declare var console: any;
export class GlobalEditable implements OnInit, OnChanges {

    @Input() element: IElement | null = null;

    ngOnInit(): void {
        if (this.element !== null) {
            this.initService.registerElement(this.element);
            setTimeout(() => {
                //@ts-ignore
                this.store$.select(x => x.element.availableElements).subscribe(elements => this.element = findElement(this.element, elements));
                this.initService.log(' selected available elements in base comp');
            }, 120)
        }
    }
//changes: {[handler in keyof (EditorComponent)]: SimpleChange}
    ngOnChanges(changes: {[handler in keyof (GlobalEditable)]: SimpleChange}): void {
        if(changes.element) {
            //console.warn('element changed::  ', changes.element.currentValue);
        }
        if(changes.element && changes.element.previousValue !== changes.element.currentValue) {
            this.initService.updateElement(changes.element.currentValue);
        }
    }

    constructor(private initService: InitService,
                private store$: Store<IAppStore>) {

    }
}
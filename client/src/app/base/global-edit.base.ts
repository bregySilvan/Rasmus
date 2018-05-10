import { IElement } from '../../../../interfaces';
import { Input, OnInit, OnChanges, SimpleChanges, SimpleChange, ChangeDetectorRef } from '@angular/core';
import { InitService } from '../services/init.service';
import { KeyService } from '../services/key.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import { findElement } from '../../utils/functions';
import { LogService } from '../services/log.service';
import * as _ from 'lodash';

declare var console: any;
export abstract class GlobalEditable implements OnInit, OnChanges {

    @Input() element: IElement | null = null;

    ngOnInit(): void {
        if (this.element !== null) {
   //         this.initService.registerElement(this.element);
        }
    }
//changes: {[handler in keyof (EditorComponent)]: SimpleChange}
    ngOnChanges(changes: {[handler in keyof (GlobalEditable)]: SimpleChange}): void {
        if(changes.element) {
            //console.warn('element changed::  ', changes.element.currentValue);
        }
        if(changes.element && !_.isEqual(changes.element.previousValue, changes.element.currentValue)) {
            this.initService.updateElement(changes.element.currentValue);
         //   this.changeRef.markForCheck();
        }
        if(changes.element && changes.element.previousValue !== changes.element.currentValue) {
          //  this.initService.updateElement(changes.element.currentValue);
        }
    }

    

    constructor(private initService: InitService,
                private store$: Store<IAppStore>,
                private changeRef: ChangeDetectorRef) {

    }
}
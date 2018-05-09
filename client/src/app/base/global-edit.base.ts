import { IElement } from '../../../../interfaces';
import { Input, OnInit } from '@angular/core';
import { InitService } from '../services/init.service';
import { KeyService } from '../services/key.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import { findElement } from '../../utils/functions';
import { LogService } from '../services/log.service';


export class GlobalEditable implements OnInit {

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

    constructor(private initService: InitService,
                private store$: Store<IAppStore>) {

    }
}
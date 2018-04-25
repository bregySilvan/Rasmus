import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAdvertisement, IListElement, IDragElementEvent } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ras-drag',
    templateUrl: './drag.component.html',
    styleUrls: ['./drag.component.css']
})
export class DragComponent {

    @Input() index: number = 0;
    @Input() element: IListElement | null = null;
    @Output() onElementDrop: EventEmitter<IDragElementEvent> = new EventEmitter();

    constructor(private store$: Store<IAppStore>,
                private logService: LogService) {

        // replace with select statement from store..
    }

    public emitOnElementDrop(event: any) {
        this.logService.log('onEöementDrop emitted:: ', event);
        this.logService.log('sending ', { element: event.dragData, index: this.index}, 'as payload');
        this.onElementDrop.emit({ element: event.dragData, index: this.index});
    }


}

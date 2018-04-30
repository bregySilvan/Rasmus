import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAdvertisement, IListElement, IDragInfo } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';
import { NO_LIST_KEY } from '../../../../config';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ras-drag',
    templateUrl: './drag.component.html',
    styleUrls: ['./drag.component.css']
})
export class DragComponent {

    @Input() index: number = 0;
    @Input() element: IListElement | null = null;
    @Input() listKey: string = NO_LIST_KEY;
    @Output() onDrop: EventEmitter<IDragInfo> = new EventEmitter();
    @Output() onDragStart: EventEmitter<IDragInfo> = new EventEmitter();
    constructor(private store$: Store<IAppStore>,
                private logService: LogService) {

        // replace with select statement from store..
    }

    public onElementDrop(event: any) {
        this.logService.log('oonElementDrop emitted:: ', { element: event.dragData, index: this.index});
        this.onDrop.emit({ element: event.dragData, index: this.index, listKey: this.listKey});
    }

    public onElementDragStart(event: any) {
        this.logService.log('onElementDragStart emitted:: ', { element: event.dragData, index: this.index});
        this.onDragStart.emit({ element: event.dragData, index: this.index, listKey: this.listKey});
    }


}

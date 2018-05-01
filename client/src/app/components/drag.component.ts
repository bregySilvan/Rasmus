import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAdvertisement, IElement } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';
import { NO_ITEM_KEY } from '../../../../config';
import { IDragInfo } from '../state/drag.reducer';
import { DragService } from '../services/drag.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ras-drag',
    templateUrl: './drag.component.html',
    styleUrls: ['./drag.component.css']
})
export class DragComponent {

    @Input() index: number = 0;
    @Input() element: IElement | null = null;
    @Input() dragContainerKey: string = NO_ITEM_KEY;

    constructor(private store$: Store<IAppStore>,
        private logService: LogService,
        private dragService: DragService) {
    }
    
    public onElementDrop(event: any) {
        this.logService.log('oonElementDrop emitted:: ', { element: event.dragData, index: this.index, parentItemKey: this.dragContainerKey });
        let dragInfo = { element: event.dragData, index: this.index, parentItemKey: this.dragContainerKey };
        this.dragService.update(dragInfo);
    }

    public onElementDragStart(event: any) {
        this.logService.log('onElementDragStart emitted:: ', { element: event.dragData, index: this.index, parentItemKey: this.dragContainerKey });
        
    //    this.onDragStart.emit({ element: event.dragData, index: this.index, parentItemKey: this.dragContainerKey });
    }

    public onElementDragEnter(event: any) {
        this.logService.log('onElementDragEnter emitted:: ', { element: event.dragData, index: this.index, parentItemKey: this.dragContainerKey });
    //    this.onDragEnter.emit({ element: event.dragData, index: this.index, parentItemKey: this.dragContainerKey });
    }
}

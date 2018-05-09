import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAdvertisement, IElement } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';
import { NO_ITEM_KEY } from '../../../../config';
import { IDragInfo, dragReducer } from '../state/drag.reducer';
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

    private _buildDragInfo(dragData: any): IDragInfo {
       return { element: dragData, index: this.index, dragContainerKey: this.dragContainerKey };
    }

    public onElementDrop(event: any) {
        this.logService.warn(this, 'onElementDrop Emitted', event.dragData);
        this.dragService.drop(this._buildDragInfo(event.dragData));
    }

    public onElementDragEnter(event: any) {
        this.logService.warn(this, 'ONELEMENT DRAG ENTER=>>', event.dragData);
        this.dragService.dragHoverEnter(this._buildDragInfo(event.dragData));
    }

    public onElementDragStart(event: any) {
        this.dragService.dragStart(this._buildDragInfo(event.dragData));
    }

    public onElementDragLeave(event: any) {
        this.dragService.dragHoverLeave();
    }
}

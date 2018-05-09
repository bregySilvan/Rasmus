import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LOCATIONS, DEFAULT_PORT } from '../../../../config';
import { RequestService } from './request.service';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';
import { IElement, IBoard } from '../../../../interfaces';
import { LogService } from './log.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import * as elementActions from '../actions/element.actions';
import * as dragActions from '../actions/drag.actions';
import { UpdateDragContainerAction, DragStartAction, DropAction } from '../actions/drag.actions';
import { IDragInfo } from '../state/drag.reducer';


@Injectable()
export class DragService {

    public constructor(private requestService: RequestService,
                       private logService: LogService,
                       private store$: Store<IAppStore>) {

    }

    public dragStart(info: IDragInfo) {
        this.store$.dispatch(new DragStartAction(info));
    }

    public isDroppable(sourceParentKey: string, targetParentKey: string): boolean {
        return true;
    }

    public drop(info: IDragInfo) {
        this.store$.dispatch(new dragActions.DropAction(info));
    }

    public dragHoverEnter(info: IDragInfo) {
        this.store$.dispatch(new dragActions.HoverItemAction(true, info));
    }

    public dragHoverLeave() {
        this.store$.dispatch(new dragActions.HoverItemAction(false, undefined));
    }
}

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
import { UpdateDragContainerAction, RegisterDragContainerAction } from '../actions/drag.actions';
import { DragContainer } from '../base-classes/drag-container.base';
import { IDragInfo } from '../state/drag.reducer';


@Injectable()
export class DragService {

    public constructor(private requestService: RequestService,
                       private logService: LogService,
                       private store$: Store<IAppStore>) {

    }

    public isDroppable(sourceParentKey: string, targetParentKey: string): boolean {
        return true;
    }

    public register(dragContainer: DragContainer) {
        this.store$.dispatch(new RegisterDragContainerAction(dragContainer));
    }

    public update(info: IDragInfo) {
        this.store$.dispatch(new UpdateDragContainerAction(info));
    }

}

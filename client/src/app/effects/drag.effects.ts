import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import * as dragActions from '../actions/drag.actions';

import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'

@Injectable()
export class NetworkEffects {

  @Effect()
    //@ts-ignore
  hostUpdate$ = this.actions$.ofType(dragActions.ActionTypes.DROP)
    .map<any, string>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({ 
        canDrop: state.drag.canDrop, 
        hoveringItem: state.drag.hoveringItem, 
        currentDragInfo: state.drag.currentDragInfo, 
        payload: payload 
    }))
    .filter(x => x.canDrop && !!x.currentDragInfo && !!x.hoveringItem)
    .map(x => ({
        index: x.hoveringItem.index,
        element: x.currentDragInfo.element,
        dragContainerKey: x.hoveringItem.dragContainerKey
    }))
    .map(x => new dragActions.UpdateDragContainerAction(x));

  constructor(private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>) {
        
    }

}
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import * as dragActions from '../actions/drag.actions';
import * as elementActions from '../actions/element.actions';
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import { IDragInfo } from '../state/drag.reducer';
import { IBoard } from '../../../../interfaces';
import * as _ from 'lodash';
import { NO_ITEM_KEY } from '../../../../config';

@Injectable()
export class NetworkEffects {

  @Effect()
  //@ts-ignore
  onDrop$ = this.actions$.ofType(dragActions.ActionTypes.DROP)
    .map<any, string>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      canDrop: state.drag.canDrop || false,
      index: state.drag.hoveringItem ? state.drag.hoveringItem.index : -1,
      dragContainerKey: state.drag.hoveringItem ? state.drag.hoveringItem.dragContainerKey : '',
      element: state.drag.currentDragInfo ? state.drag.currentDragInfo.element : { type: 'empty', key: NO_ITEM_KEY }
    }))
    .filter(x => x.element.type !== 'empty' && x.canDrop && x.index > -1)
    .map(x => (<IDragInfo>{dragContainerKey: x.dragContainerKey, element: x.element, index: x.index}))
    .map(x => new dragActions.UpdateDragContainerAction(x));

  @Effect()
  //@ts-ignore
  containerUpdate$ = this.actions$.ofType(dragActions.ActionTypes.UPDATE_DRAG_CONTAINER)
    .map<any, IDragInfo>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      dragInfo: payload,
      elements: state.element.availableElements,
    }))
    .map(x => {
      let element = x.elements.find(element => element.key === x.dragInfo.dragContainerKey);
      if (element && element.type === 'board') {
        let newElement = _.cloneDeep(element) as IBoard;
        newElement.elements[x.dragInfo.index] = x.dragInfo.element;
        return newElement;
      }
      return null;
    })
    .map(x => x ? [x] : [])
    .map(x => new elementActions.TryUpdateElementsAction(x));


  constructor(private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>) {

  }

}
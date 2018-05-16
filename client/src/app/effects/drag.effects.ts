import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import * as dragActions from '../actions/drag.actions';
import * as elementActions from '../actions/element.actions';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import { IDragInfo } from '../state/drag.reducer';
import { IBoard, IElement, IContainer } from '../../../../interfaces';
import * as _ from 'lodash';
import { NO_ITEM_KEY } from '../../../../config';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class DragEffects {


 /* @Effect()
  //@ts-ignore
  updateContainers$ = this.actions$.ofType(elementActions.ActionTypes.UPDATE_ELEMENTSUPDATE_ELEMENTS)
    .map<any, IElement[]>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
         oldElements: state.element.elements.filter(el => el.type === 'container'),
         update: payload
       }))
    .map( x => {
      
    })*/


  @Effect()
  //@ts-ignore
  onDrop$ = this.actions$.ofType(dragActions.ActionTypes.DROP)
    .map<any, IDragInfo>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
   //   canDrop: state.drag.canDrop,
      canDrop: true,
      dragInfo: payload
    }))
    .do( x => this.logService.warn(this, 'drop action effect triggered'))
    .filter(x => x.canDrop && x.dragInfo.element.type === 'container' && x.dragInfo.index > -1)
    .map(x => new dragActions.UpdateDragContainerAction(x.dragInfo));

  @Effect()
  //@ts-ignore
  containerUpdate$ = this.actions$.ofType(dragActions.ActionTypes.UPDATE_DRAG_CONTAINER)
    .map<any, IDragInfo>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      dragInfo: payload,
      containers: state.element.containers as IContainer[],
    }))
    .map(x => {
      let container = x.containers.find(element => element.key === x.dragInfo.dragContainerKey);
      if (container) {
        let newContainer = _.cloneDeep(container);
        newContainer.elements[x.dragInfo.index] = x.dragInfo.element;
        return newContainer;
      } else {
        this.logService.warn(this, 'failed to update drag container');
      }
      return null;
    })
    .map(x => new elementActions.TryUpdateElementsAction(x ? [x] : []));

  @Effect()
  //@ts-ignore
  dropStateChange$ = this.actions$.ofType(dragActions.ActionTypes.DROP_STATE_CHANGE)
    .map<any, boolean>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({ currentDropState: state.drag.canDrop, nextDropState: payload }))
    .filter(x => x.currentDropState !== x.nextDropState)
    .map(x => new dragActions.DropStateChangeDoneAction(x.nextDropState));

  @Effect()
  //@ts-ignore
  $hoverEnter = this.actions$.ofType(dragActions.ActionTypes.HOVER_ITEM)
    .map<any, { newState: boolean; dragInfo?: IDragInfo }>(toPayload)
    .debounceTime(120)
    .map(x => new dragActions.DropStateChangeAction(x.newState));

  constructor(private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>) {

  }

}
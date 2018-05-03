import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import * as elementActions from '../actions/element.actions';
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import { IHost } from '../state/network.reducer';
import { ElementService } from '../services/element.service';
import { IElement, IBoard } from '../../../../interfaces';
import { unionDistinct, unionElementsDistinct } from '../../utils/functions';
@Injectable()
export class ElementEffects {

  @Effect({ dispatch: false })
  //@ts-ignore
  loadAvailableElements$ = this.actions$.ofType(elementActions.ActionTypes.LOAD_AVAILABLE_ELEMENTS)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => (state.network))
    .map(x => x.hosts.filter((host: IHost) => host.isAlive))
    .filter(activeHosts => !!activeHosts.length)
    .do(activeHosts => {
      activeHosts.forEach((host: IHost) => {
        this.logService.log('host:: ', host);
         let sub = this.elementService.getElements(host).subscribe((elements: IElement[]) => {
          this.store$.dispatch(new elementActions.TryUpdateElementsAction(elements));
          sub.unsubscribe();
        });
      });
    });

  @Effect({ dispatch: false})
  //@ts-ignore
  loadAvailableBoards$ = this.actions$.ofType(elementActions.ActionTypes.LOAD_AVAILABLE_BOARDS)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => (state.network))
    .map(x => x.hosts.filter((host: IHost) => host.isAlive))
    .filter(activeHosts => !!activeHosts.length)
    .do(activeHosts => {
      activeHosts.forEach((host: IHost) => {
        let sub = this.elementService.getBoards(host).subscribe((boards: IBoard[]) => {
          this.store$.dispatch(new elementActions.TryUpdateBoardsAction(boards));
          sub.unsubscribe();
        });
      });
    });

  @Effect()
  //@ts-ignore
  tryUpdateBoards$ = this.actions$.ofType(elementActions.ActionTypes.TRY_UPDATE_BOARDS)
    .map<any, IBoard[]>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      currentBoards: state.element.availableBoards,
      updatedBoards: payload
    }))
    .map(x => unionElementsDistinct(x.updatedBoards, x.currentBoards))
    .filter(x => x.hasChanged)
    .map(x => new elementActions.UpdateBoardsAction(x.unionArr));

  @Effect()
  //@ts-ignore
  tryUpdateElements$ = this.actions$.ofType(elementActions.ActionTypes.TRY_UPDATE_ELEMENTS)
    .map<any, IElement[]>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      currentElements: state.element.availableElements,
      updatedElements: payload
    }))
    .map(x => unionElementsDistinct(x.updatedElements, x.currentElements))
    .filter(x => x.hasChanged)
    .map(x => new elementActions.UpdateElementsAction(x.unionArr));

  constructor(private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>,
    private elementService: ElementService) {
  }

}

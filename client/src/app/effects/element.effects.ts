import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import * as elementActions from '../actions/element.actions';
import * as networkActions from '../actions/network.actions';
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import { IHost } from '../state/network.reducer';
import { ElementService } from '../services/element.service';
import { IListElement, IBoard } from '../../../../interfaces';
import { Observable } from 'rxjs/Observable';
import { applyChanges } from '../../utils/functions';
import { AUTO_DATA_LOADING } from '../../../../config';
import { DataService } from '../services/data.service';

@Injectable()
export class ElementEffects {

  @Effect()
  //@ts-ignore
  loadElementsFromNewHost$ = this.actions$.ofType(networkActions.ActionTypes.HOSTS_UPDATE)
    .filter(x => AUTO_DATA_LOADING)
    .mergeMap(x => [new elementActions.LoadAvailableBoardsAction(), new elementActions.LoadAvailableElementsAction()]);


  @Effect()
  //@ts-ignore
  $saveBoards = this.actions$.ofType(elementActions.ActionTypes.SAVE_BOARDS)
    .map<any, IBoard[]>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({ hosts: state.network.hosts, boards: payload }))
    .map(x => ({ hosts: x.hosts.filter(host => host.isAlive), boards: x.boards }))
    .do(x => x.hosts.forEach(host => this.dataService.saveBoards(host.ipAddress, x.boards)));


  @Effect()
  //@ts-ignore
  $saveElements = this.actions$.ofType(elementActions.ActionTypes.SAVE_ELEMENTS)
    .map<any, IListElement[]>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({ hosts: state.network.hosts, elements: payload }))
    .map(x => ({ hosts: x.hosts.filter(host => host.isAlive), elements: x.elements }))
    .do(x => x.hosts.forEach(host => this.dataService.saveElements(host.ipAddress, x.elements)));

  @Effect()
  //@ts-ignore
  loadAvailableElements$ = this.actions$.ofType(elementActions.ActionTypes.LOAD_AVAILABLE_ELEMENTS)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => (state.network))
    .map(x => x.hosts.filter((host: IHost) => host.isAlive))
    .filter(activeHosts => !!activeHosts.length)
    .do(activeHosts => {
      activeHosts.forEach((host: IHost) => {
        this.logService.log('host:: ', host);
        let sub = this.dataService.getAllElements(host.ipAddress).subscribe((elements: IListElement[]) => {
          this.store$.dispatch(new elementActions.TryUpdateElementsAction(elements));
          sub.unsubscribe();
        });
      });
    });

  @Effect()
  //@ts-ignore
  loadAvailableBoards$ = this.actions$.ofType(elementActions.ActionTypes.LOAD_AVAILABLE_BOARDS)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => (state.network))
    .map(x => x.hosts.filter((host: IHost) => host.isAlive))
    .filter(activeHosts => !!activeHosts.length)
    .do(activeHosts => {
      activeHosts.forEach((host: IHost) => {
        let sub = this.dataService.getAllBoards(host.ipAddress).subscribe((boards: IBoard[]) => {
          this.store$.dispatch((new elementActions.TryUpdateBoardsAction(boards)));
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
    .map(x => applyChanges<IBoard>(x.updatedBoards, x.currentBoards, this.elementService.areEqualBoards))
    .filter(x => x.hasChanged)
    .map(x => new elementActions.UpdateBoardsAction(x.unionArr));

  @Effect()
  //@ts-ignore
  tryUpdateElements$ = this.actions$.ofType(elementActions.ActionTypes.TRY_UPDATE_ELEMENTS)
    .map<any, IListElement[]>(toPayload)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      currentElements: state.element.availableElements,
      updatedElements: payload
    }))
    .map(x => applyChanges<IListElement>(x.updatedElements, x.currentElements, this.elementService.areEqualElements))
    .filter(x => x.hasChanged)
    .map(x => new elementActions.UpdateElementsAction(x.unionArr));

  constructor(private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>,
    private elementService: ElementService,
    private dataService: DataService) {
  }

}

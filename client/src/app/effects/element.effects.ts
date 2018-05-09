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
import 'rxjs/add/operator/bufferTime'
import { IHost } from '../state/network.reducer';
import { ElementService } from '../services/element.service';
import { Observable } from 'rxjs/Observable';
import { AUTO_DATA_LOADING } from '../../../../config';
import { DataService } from '../services/data.service';
import { IElement, IBoard } from '../../../../interfaces';
import { unionElementsDistinct } from '../../utils/functions';
import * as _ from 'lodash';


@Injectable()
export class ElementEffects {

  @Effect({ dispatch: false })
  //@ts-ignore
  loadElementsFromNewHost$ = this.actions$.ofType(networkActions.ActionTypes.HOSTS_UPDATE)
    .filter(x => AUTO_DATA_LOADING)
    .map(x =>  new elementActions.LoadAvailableElementsAction());

  @Effect()
  //@ts-ignore
  $saveElements = this.actions$.ofType(elementActions.ActionTypes.SAVE_ELEMENTS)
    .map<any, IElement[]>(toPayload)
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
        this.logService.log(this, 'host:: ', host);
        let sub = this.dataService.getAllElements(host.ipAddress).subscribe((elements: IElement[]) => {
          this.logService.warn(this, 'loaded available elements:: ', elements);
          this.store$.dispatch(new elementActions.TryUpdateElementsAction(elements));
          sub.unsubscribe();
        });
      });
    });

  @Effect()
  //@ts-ignore
  tryUpdateElements$ = this.actions$.ofType(elementActions.ActionTypes.TRY_UPDATE_ELEMENTS)
    .map<any, IElement[]>(toPayload)
    .bufferTime(60)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      currentElements: state.element.availableElements,
      updatedElements: _.flatten(payload)
    }))
    .map(x => unionElementsDistinct<IElement>(x.updatedElements, x.currentElements))
    .filter(x => x.hasChanged)
    .map(x => new elementActions.UpdateElementsAction(x.unionArr));

  constructor(private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>,
    private elementService: ElementService,
    private dataService: DataService) {
  }

}



import { Injectable } from '@angular/core';
//import { Effect, Actions, toPayload } from '@ngrx/effects';
import { IHost } from '../state/network.reducer';
import { NetworkService } from '../services/network.service';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as netowrkActions from '../actions/network.actions';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter';
import { Effect, Actions, toPayload } from '@ngrx/effects';

@Injectable()
export class NetworkEffects {

  @Effect()
  hostUpdate$ = this.actions$.ofType(netowrkActions.ActionTypes.HOST_UPDATE)
    .map<any, IHost>(toPayload)
    .withLatestFrom(this.store$, (action, state) => ({
      hosts: state.network.knownHosts,
      updatedHost: action.payload
    }))
    .switchMap((x => {
      let hosts = this.networkService.updateOrReplace(x.hosts, x.updatedHost);
      return new netowrkActions.HostsUpdateAction(hosts);
    }));


  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private router: Router,
    private logService: LogService,
    private networkService: NetworkService
  ) {

  }
}

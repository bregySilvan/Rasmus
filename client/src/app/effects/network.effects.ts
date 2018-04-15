

import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { Observable } from 'rxjs/Observable';
import { SERVER_ADDRESSES, LOCAL_ADDRESS, LOCAL_SUBNET_MASK, KEEP_ALIVE_INTERVAL, GENERAL_REQUEST_DELAY_MS } from '../../../../config';
import { NetworkActions, HostUpdateAction } from '../actions/network.actions';
import { RequestService } from '../services/request.service';
import { IHost } from '../state/network.reducer';
import { NetworkService } from '../services/network.service';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as networkActions from '../actions/network.actions';
import { map, switchMap, filter } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { Effect, Actions, toPayload } from '@ngrx/effects';
@Injectable()
export class NetworkEffects {

  @Effect()
  //@ts-ignore
  hostUpdate$ = this.actions$.ofType(networkActions.ActionTypes.HOST_UPDATE)
    .map<any, IHost>(toPayload)
    .withLatestFrom(this.store$, (payload, state) => ({
      hosts: state.network.foundHosts,
      updatedHost: payload
    }))
    .map(x => {
      let hosts = this.networkService.updateOrAdd(x.hosts, x.updatedHost);
      return new networkActions.HostsUpdateAction(hosts);
    });

  @Effect()
  //@ts-ignore
  testHost$ = this.actions$.ofType(networkActions.ActionTypes.TEST_HOST)
    .map<any, IHost>(toPayload)
    .map(host => this.networkService.testAndUpdateHost(host)
      .subscribe((updatedHost: IHost) => new networkActions.HostUpdateAction(updatedHost)));

  @Effect()
  //@ts-ignore
  startDetection$ = this.actions$.ofType(networkActions.ActionTypes.START_DETECTION)
    .do(() => this.networkService.calculatePossibleAddresses(LOCAL_ADDRESS, LOCAL_SUBNET_MASK))
    .delay(1200)
    .switchMap(() => interval(KEEP_ALIVE_INTERVAL))
    .do(() => this.logService.log('checkPossibleHostsActionTriggered'))
    .withLatestFrom(this.store$, (action, state) => state.network.isDetecting)
    .filter(isDetecting => isDetecting)
    .map(() => new networkActions.CheckPossibleHostsAction())

  @Effect({ dispatch: false })
  //@ts-ignore
  checkPossibleHosts$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS)
    .withLatestFrom(this.store$, (action, state) => state.network.possibleAddresses)
    .map(possibleAddresses => possibleAddresses
      .map((address: string) => ({
        ipAddress: address,
        hostname: '',
        isPending: true,
        isAlive: false
      })))
    .do((hosts: IHost[]) => {
      let delay = 0;
      let interval = GENERAL_REQUEST_DELAY_MS;
      hosts.forEach(host => {
        timer(delay).subscribe(() => {
          this.networkService.testHost(host);
        });
        delay += interval+1;
      });
    });

  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private router: Router,
    private logService: LogService,
    private networkService: NetworkService
  ) {

  }
}

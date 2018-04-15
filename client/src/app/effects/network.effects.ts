

import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import { Observable } from 'rxjs/Observable';
import { SERVER_ADDRESSES, LOCAL_ADDRESS, LOCAL_SUBNET_MASK, KEEP_ALIVE_INTERVAL, PARALLEL_REQUEST_LIMIT, HOST_DETECTION_INTERVAL } from '../../../../config';
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
    .do((x) => this.logService.log('HOST_UPDATE yay.. BEFORE check'))
    .filter(x => x.updatedHost.isAlive)
    .do((x) => this.logService.log('HOST_UPDATE yay.. AFTER check'))
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

  @Effect()
  //@ts-ignore
  checkPossibleHostsDone$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS_DONE)
    .map<any, string>(toPayload)
    .withLatestFrom(this.store$, (payload, state) => ({
      isDetecting: state.network.isDetecting,
      requestType: payload,
      calculatedAddresses: state.network.possibleAddresses,
      preferedAddresses: SERVER_ADDRESSES
    }))
    .filter(x => x.isDetecting)
    .do((x) => {
      if(x.requestType === 'keep-alive') {
        timer(0, KEEP_ALIVE_INTERVAL).subscribe(() => {
          this.networkService.testAddresses(x.preferedAddresses, PARALLEL_REQUEST_LIMIT / 2 || 1, 'keep-alive');
        }).unsubscribe();
      } else if(x.requestType === 'once') {
        timer(0, HOST_DETECTION_INTERVAL).subscribe(() => {
          this.networkService.testAddresses(x.preferedAddresses, PARALLEL_REQUEST_LIMIT / 2 || 1, 'once');
        }).unsubscribe();
      }
    });

  @Effect({ dispatch: false })
  //@ts-ignore
  checkPossibleHosts$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS)
    .withLatestFrom(this.store$, (action, state) => ({
      calculatedAddresses: state.network.possibleAddresses,
      preferedAddresses: SERVER_ADDRESSES,
      parallelRequestLimit: PARALLEL_REQUEST_LIMIT
    }))
    //@ts-ignore
    .do(x => this.networkService.testAddresses(x.preferedAddresses, x.parallelRequestLimit / 2 || 1, 'keep-alive'))
    .delay(PARALLEL_REQUEST_LIMIT / 2 * 30)
    //@ts-ignore
    .do(x => this.networkService.testAddresses(x.calculatedAddresses, x.parallelRequestLimit / 2 || 1, 'once'));

  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private router: Router,
    private logService: LogService,
    private networkService: NetworkService
  ) {

  }
}



import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { SERVER_ADDRESSES, LOCAL_ADDRESS, LOCAL_SUBNET_MASK, KEEP_ALIVE_INTERVAL_MS, PARALLEL_REQUEST_LIMIT, HOST_DETECTION_INTERVAL_MS } from '../../../../config';
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
    .filter(x => x.updatedHost.isAlive)
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
    .map(() => new networkActions.CheckPossibleHostsAction())


  @Effect({ dispatch: false })
  //@ts-ignore
  checkPossibleHosts$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS, networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS_DONE)
    .withLatestFrom(this.store$, (action, state) => ({
      calculatedAddresses: state.network.possibleAddresses,
      foundHosts: state.network.foundHosts,
      isDetecting: state.network.isDetecting,
      preferedAddresses: SERVER_ADDRESSES,
      parallelRequestLimit: PARALLEL_REQUEST_LIMIT,
      payload: action.payload
    }))
    .filter(x => x.isDetecting)
    .do(x => {
      let keepAliveDelay = 0;
      let discoveryDelay = 0;
      let runKeepAlive= true, runDiscovery = true;

      let requestLimit = x.parallelRequestLimit / 2 || 1;
      let foundHostAddresses: string[] = x.foundHosts.map((host: IHost) => host.ipAddress);
      if (x.payload) {
        keepAliveDelay = KEEP_ALIVE_INTERVAL_MS;
        discoveryDelay = HOST_DETECTION_INTERVAL_MS;
        runKeepAlive = x.payload === 'keep-alive';
        runDiscovery = x.payload === 'discovery';
      }

      if (runKeepAlive) {
        this.logService.warn('let\'s run keep-alive ping');
        timer(keepAliveDelay).subscribe(() => {
          this.networkService.testAddresses(_.concat(foundHostAddresses, x.preferedAddresses), requestLimit, 'keep-alive');
        });
      }
      if (runDiscovery) {
        this.logService.warn('let\'s run discovery ping');
        timer(discoveryDelay).subscribe(() => {
          this.networkService.testAddresses(x.calculatedAddresses, requestLimit, 'discovery');
        });
      }
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

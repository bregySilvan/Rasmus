

import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { SERVER_ADDRESSES, LOCAL_ADDRESS, LOCAL_SUBNET_MASK, KEEP_ALIVE_INTERVAL_MS, PARALLEL_REQUEST_LIMIT, HOST_DETECTION_INTERVAL_MS } from '../../../../config';
import { NetworkActions } from '../actions/network.actions';
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

  @Effect({ dispatch: false })
  //@ts-ignore
  hostUpdate$ = this.actions$.ofType(networkActions.ActionTypes.TRY_HOST_UPDATE)
    .map<any, IHost>(toPayload)
    .withLatestFrom(this.store$, (payload, state) => ({
      currentHosts: state.network.hosts,
      updatedHost: payload
    }))
    .map(x => {
      let index = x.currentHosts.findIndex((host: IHost) => host.ipAddress === x.updatedHost.ipAddress);
      let updatedHosts = x.currentHosts;
      let needsUpdate = false;
      if (index > -1) {
        let oldHost = updatedHosts[index];
        needsUpdate = oldHost.isAlive === x.updatedHost.isAlive;
        updatedHosts[index] = x.updatedHost;
      } else {
        updatedHosts.push(x.updatedHost);
      }

      return {
        updatedHosts: updatedHosts,
        needsUpdate: needsUpdate
      };
    })
    .filter(x => x.needsUpdate)
    .map(x => new networkActions.HostsUpdateAction(x.updatedHosts));


  @Effect()
  //@ts-ignore
  startDetection$ = this.actions$.ofType(networkActions.ActionTypes.START_DETECTION)
    .do(() => this.networkService.calculatePossibleAddresses(LOCAL_ADDRESS, LOCAL_SUBNET_MASK))
    .delay(1200)
    .map(() => [new networkActions.CheckPossibleHostsAction(), new networkActions.KeepAliveActiveHostsAction()]);

  @Effect()
  //@ts-ignore
  startDetection$ = this.actions$.ofType(networkActions.ActionTypes.KEEP_ALIVE_ACTIVE_HOSTS)
    .withLatestFrom(this.store$, (action, state) => ({
      hosts: state.network.hosts,
      preferedAddresses: SERVER_ADDRESSES
    }))
    .do((x) => {
      timer(keepAliveDelay).subscribe(() => {
        this.networkService.testAddresses(_.concat(x.activeHosts, x.preferedAddresses), requestLimit, 'keep-alive');
      });
    })


  @Effect({ dispatch: false })
  //@ts-ignore
  checkAllHosts$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS, networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS_DONE)
    .withLatestFrom(this.store$, (action, state) => ({
      possibleHosts: state.network.possibleHosts,
      activeHosts: state.network.activeHosts,
      isDetecting: state.network.isDetecting,
      preferedAddresses: SERVER_ADDRESSES,
      parallelRequestLimit: PARALLEL_REQUEST_LIMIT,
      payload: action.payload
    }))
    .filter(x => x.isDetecting)
    .do(x => {
      let keepAliveDelay = 0;
      let discoveryDelay = 0;
      let runKeepAlive = true, runDiscovery = true;
      let requestLimit = x.parallelRequestLimit;

      if (x.payload) {
        keepAliveDelay = KEEP_ALIVE_INTERVAL_MS;
        discoveryDelay = HOST_DETECTION_INTERVAL_MS;
        runKeepAlive = x.payload === 'keep-alive';
        runDiscovery = x.payload === 'discovery';
      }

      if (runKeepAlive) {
        this.logService.warn('let\'s run keep-alive ping');
        timer(keepAliveDelay).subscribe(() => {
          this.networkService.testAddresses(_.concat(x.activeHosts, x.preferedAddresses), requestLimit, 'keep-alive');
        });
      }
      if (runDiscovery) {
        this.logService.warn('let\'s run discovery ping');
        timer(discoveryDelay).subscribe(() => {
          this.networkService.testAddresses(x.possibleHosts, requestLimit, 'discovery');
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

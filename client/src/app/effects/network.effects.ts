
import { KeepAliveActiveHostsAction } from "./../actions/network.actions";

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

  @Effect({ dispatch: false })
  //@ts-ignore
  keepAliveActiveHosts$ = this.actions$.ofType(networkActions.ActionTypes.KEEP_ALIVE_ACTIVE_HOSTS)
    .withLatestFrom(this.store$, (action, state) => ({
      hosts: state.network.hosts,
      preferedAddresses: SERVER_ADDRESSES,
      keepAliveTimeout: KEEP_ALIVE_INTERVAL_MS,
      requestLimit: PARALLEL_REQUEST_LIMIT,
      isDetecting: state.network.isDetecting
    }))
    .filter(x => x.isDetecting)
    .do((x) => {
      let activeHosts = x.hosts.filter((host: IHost) => host.isAlive);
      this.networkService.testAddresses(_.concat(activeHosts, x.preferedAddresses), x.requestLimit);
      timer(x.keepAliveTimeout).subscribe(() => {
        this.networkService.keepAliveActiveHosts();
      });
    });

    @Effect({ dispatch: false })
  //@ts-ignore
  checkPossibleHosts$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS)
    .withLatestFrom(this.store$, (action, state) => ({
      hosts: state.network.hosts,
      checkAllTimeout: HOST_DETECTION_INTERVAL_MS,
      requestLimit: PARALLEL_REQUEST_LIMIT,
      isDetecting: state.network.isDetecting
    }))
    .filter(x => x.isDetecting)
    .do((x) => {
      let inActiveHosts = x.hosts.filter((host: IHost) => !host.isAlive);
      this.networkService.testAddresses(inActiveHosts, x.requestLimit);
      timer(x.checkAllTimeout).subscribe(() => {
        this.networkService.checkPossibleHosts();
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

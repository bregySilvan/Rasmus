

import { Injectable } from '@angular/core';
//import { Effect, Actions, toPayload } from '@ngrx/effects';
import { SERVER_ADDRESSES, LOCAL_ADDRESS, LOCAL_SUBNET_MASK, KEEP_ALIVE_INTERVAL } from '../../../../config';
import { NetworkActions, HostUpdateAction } from '../actions/network.actions';
import { RequestService } from '../services/request.service';
import { IHost } from '../state/network.reducer';
import { NetworkService } from '../services/network.service';
import { LogService } from '../services/log.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as networkActions from '../actions/network.actions';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter';
import { Effect, Actions, toPayload } from '@ngrx/effects';
@Injectable()
export class NetworkEffects {

  @Effect()
  hostUpdate$ = this.actions$.ofType(networkActions.ActionTypes.HOST_UPDATE)
    .map<any, IHost>(toPayload)
    .withLatestFrom(this.store$, (action, state) => ({
      hosts: state.network.knownHosts,
      updatedHost: action.payload
    }))
    .switchMap(x => {
      let hosts = this.networkService.updateOrAdd(x.hosts, x.updatedHost);
      return new networkActions.HostsUpdateAction(hosts);
    });

  @Effect()
  testHost$ = this.actions$.ofType(networkActions.ActionTypes.TEST_HOST)
    .map<any, IHost>(toPayload)
    .switchMap(host => this.networkService.testAndUpdateHost(host)
      .map((updatedHost: IHost) =>  {
        if(updatedHost.isAlive) {
          setTimeout(() => {
            this.networkService.testHost(updatedHost);
          }, KEEP_ALIVE_INTERVAL)
        }
        return new networkActions.HostUpdateAction(updatedHost);
      }));

    @Effect()
    startDetection$ = this.actions$.ofType(networkActions.ActionTypes.START_DETECTION)
    .map((x) =>  this.networkService.calculatePossibleAdresses(LOCAL_ADDRESS, LOCAL_SUBNET_MASK))
    .
    .switchMap(x =>  {

     })

  @Effect({ dispatch: false })
  startDetection$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS)
    .withLatestFrom(this.store$, (action, state) => ({
      isDetecting: state.network.isDetecting,
      possibleAddresses: this.networkService.calculatePossibleAdresses(LOCAL_ADDRESS, LOCAL_SUBNET_MASK),
    }))
    .filter(x => x.isDetecting)
    .do(x => {
      let possibleAddresses =
      possibleAddresses.forEach(address => {
        setTimeout(() => {
          this.networkService.testHost({
            ipAddress: address,
            hostname: '',
            isPending: true,
            isAlive: false
          })
        }, 75);
      })
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


import { Injectable } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { interval } from 'rxjs/observable/interval';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { SERVER_ADDRESSES, LOCAL_ADDRESS, LOCAL_SUBNET_MASK, KEEP_ALIVE_INTERVAL_MS, PARALLEL_REQUEST_LIMIT, HOST_DETECTION_INTERVAL_MS, AUTO_HOST_DETECTION } from '../../../../config';
import { IHost } from '../state/network.reducer';
import { NetworkService } from '../services/network.service';
import { LogService } from '../services/log.service';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as networkActions from '../actions/network.actions';
import { map, switchMap, filter } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/bufferTime';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { unionDistinct } from '../../utils/functions';

@Injectable()
export class NetworkEffects {

  @Effect()
  //@ts-ignore
  hostUpdate$ = this.actions$.ofType(networkActions.ActionTypes.TRY_UPDATE_HOSTS)
    .map<any, IHost[]>(toPayload)
    .bufferTime(300)
    .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
      currentHosts: state.network.hosts,
      updatedHost: _.flatten(payload)
    }))
    .map(x => unionDistinct(x.updatedHost, x.currentHosts, this.networkService.areEqualHosts))
    .filter(x => x.hasChanged)
    .do(x => this.logService.warn(this, 'try update Hosts triggered..'))
    .map(x => new networkActions.HostsUpdateAction(x.unionArr));


  @Effect()
  //@ts-ignore
  startDetection$ = this.actions$.ofType(networkActions.ActionTypes.START_DETECTION)
  .filter(x => AUTO_HOST_DETECTION)
    .do(() => this.networkService.calculatePossibleAddresses(LOCAL_ADDRESS, LOCAL_SUBNET_MASK))
    .delay(1200)
   // .map(() => [new networkActions.CheckPossibleHostsAction(), new networkActions.KeepAliveActiveHostsAction()]);
   .mergeMap(x => ([
     new networkActions.CheckPossibleHostsAction(),
     new networkActions.KeepAliveActiveHostsAction()]));
     

  @Effect({ dispatch: false })
  //@ts-ignore
  keepAliveActiveHosts$ = this.actions$.ofType(networkActions.ActionTypes.KEEP_ALIVE_ACTIVE_HOSTS)
    .withLatestFrom(this.store$, (action: networkActions.KeepAliveActiveHostsAction, state: IAppStore) => ({
      hosts: state.network.hosts,
      preferedAddresses: SERVER_ADDRESSES,
      keepAliveTimeout: KEEP_ALIVE_INTERVAL_MS,
      requestLimit: PARALLEL_REQUEST_LIMIT,
      isDetecting: state.network.isDetecting
    }))
    .filter(x => x.isDetecting)
    .do((x) => {
      let activeHosts: IHost[] = x.hosts.filter((host: IHost) => host.isAlive);
      let preferedHosts: IHost[] = x.preferedAddresses.map((address: string) => ({ ipAddress: address, isAlive: false}));      
      let keepAliveHosts = unionDistinct(activeHosts, preferedHosts, this.networkService.areEqualHosts).unionArr;

      this.networkService.testHosts(keepAliveHosts, x.requestLimit);
      timer(x.keepAliveTimeout).subscribe(() => {
        this.networkService.keepAliveActiveHosts();
      });
    });

    @Effect({ dispatch: false })
  //@ts-ignore
  checkPossibleHosts$ = this.actions$.ofType(networkActions.ActionTypes.CHECK_POSSIBLE_HOSTS)
    .withLatestFrom(this.store$, (action, state: IAppStore) => ({
      hosts: state.network.hosts,
      checkAllTimeout: HOST_DETECTION_INTERVAL_MS,
      requestLimit: PARALLEL_REQUEST_LIMIT,
      isDetecting: state.network.isDetecting
    }))
    .filter(x => x.isDetecting)
    .do(x => {
      let inActiveHosts: IHost[] = x.hosts.filter((host: IHost) => !host.isAlive);
      this.networkService.testHosts(inActiveHosts, x.requestLimit);
      timer(x.checkAllTimeout).subscribe(() => {
        this.networkService.checkPossibleHosts();
      });
    });

  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private logService: LogService,
    private networkService: NetworkService
  ) {

  }
}

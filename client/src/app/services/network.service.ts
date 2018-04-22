import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { IHost } from '../state/network.reducer';
import 'rxjs/add/observable/of';
import { DEFAULT_PORT, LOCATIONS } from '../../../../config';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import * as networkActions from '../actions/network.actions';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import { LogService } from './log.service';
import * as async from 'async';
import { timer } from 'rxjs/observable/timer';

declare var window: any;

@Injectable()
export class NetworkService {

  public startDetection(): void {
    this.store$.dispatch(new networkActions.StartDetectionAction());
  }

  public keepAliveActiveHosts(): void {
    this.store$.dispatch(new networkActions.KeepAliveActiveHostsAction());
  }

  public checkPossibleHosts(): void {
    this.store$.dispatch(new networkActions.CheckPossibleHostsAction());
  }

  public hostsUpdateDone(host: IHost[]): void {
    this.store$.dispatch(new networkActions.HostsUpdateAction(host));
  }

  public calculatePossibleAddresses(localAddress: string, localSubnetMask: string): void {
    let possibleAddresses: IHost[] = this._calculatePossibleAdresses(localAddress, localSubnetMask).map(address => ({ ipAddress: address, isAlive: false }));
    this.store$.dispatch(new networkActions.HostsUpdateAction(possibleAddresses));
  }

  //@ todo: change implementation :)
  private _calculatePossibleAdresses(localAddress: string, localSubnetMask: string): string[] {
    let possibleAddresses: string[] = [];
    let networkPart = localAddress.substring(0, localAddress.lastIndexOf("."));
    if (localSubnetMask === '255.255.255.0') {
      for (let i = 1; i < 254; i++) {
        possibleAddresses.push(`${networkPart}.${i}`);
      }
    }
    return possibleAddresses;
  }

  public areEqualHosts(host1: IHost, host2: IHost) {
    return host1.ipAddress === host2.ipAddress;
  }

  public testHosts(hosts: IHost[], maxParallelRequests: number = 150): void {

    async.eachLimit(hosts, maxParallelRequests, (host: IHost, eachCb: () => void) => {
      
      this.testAndUpdateHost(host).subscribe((updatedHost: IHost) => {
        this.store$.dispatch(new networkActions.TryUpdateHostsAction([updatedHost]));
        eachCb();
      });
    }, (error) => {
      if (error) {
      //  this.logService.error('failed to reach host: ');
      }
    });
  }

  public testAndUpdateHost(host: IHost): Observable<IHost> {

    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.isAlive}`;

    let newHost: IHost = {
      ipAddress: host.ipAddress,
      isAlive: false
    };

    return this.requestService.get(url).map((response => {
      let resObj = response.json();
      newHost.isAlive = resObj.isAlive || false;
      return newHost;
    })).catch(error => {

      return Observable.of(newHost);
    });
  }

  constructor(private requestService: RequestService,
    private store$: Store<IAppStore>,
    private logService: LogService) {
  }

}

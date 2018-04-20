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
    let possibleAddresses: IHost[] = this._calculatePossibleAdresses(localAddress, localSubnetMask).map(address => ({ipAddress: address, isAlive: false}));
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

  public updateOrAdd(hosts: IHost[], updatedHost: IHost): IHost[] {

    let index = hosts.findIndex((host => host.ipAddress === updatedHost.ipAddress));

    if (index > -1) {
      hosts[index] = updatedHost;
    } else {
      hosts.push(updatedHost);
    }

    return hosts;
  }

  public testAddresses(addresses: string[], maxParallelRequests: number = 6): void {
    this.logService.log('testAdrress start');
    async.eachLimit(addresses, maxParallelRequests, (address: string, eachCb: () => void) => {
      let host: IHost = {
        ipAddress: address || '',
        isAlive: false,
      };
      this.logService.log('in eachCB, host: ', host);
      this.testAndUpdateHost(host).subscribe((updatedHost: IHost) => {
        this.store$.dispatch(new networkActions.TryHostUpdateAction(updatedHost));
        eachCb();
      });
    }, (error) => {
      if (error) {
        this.logService.error('failed to reach host: ');
      }
      this.logService.warn('disüpatching checkkpopssibleHostDoneACron...');
    });
  }

  public testAndUpdateHost(host: IHost): Observable<IHost> {
    this.logService.log('testAndUpdateHost:: ');
    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.isAlive}`;
    this.logService.log('testAndUpadteHostCalled');
    let newHost: IHost = {
      ipAddress: host.ipAddress,
      isAlive: false
    };
  //  try {
      this.logService.log('start with requestservice:: ');
      return this.requestService.get(url).map((response => {
        this.logService.log('received response: ', response);
        let resObj = response.json();
        newHost.isAlive = resObj.isAlive || false;
        return newHost;
      })).catch(error => {
        this.logService.warn('creating empty newHost:: ');
        return Observable.of(newHost);
      });
    }

  constructor(private requestService: RequestService,
      private store$: Store < IAppStore >,
      private logService: LogService) {
    }

  }

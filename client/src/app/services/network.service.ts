import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { IHost } from '../state/network.reducer';
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

  public testHost(host: IHost): void {
    this.store$.dispatch(new networkActions.TestHostAction(host));
  }

  public calculatePossibleAddresses(localAddress: string, localSubnetMask: string): void {
    let possibleAddresses: string[] = this._calculatePossibleAdresses(localAddress, localSubnetMask);
    this.store$.dispatch(new networkActions.PossibleAddressesCalculatedAction(possibleAddresses));
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

  private _testAddressesNoChecks(addresses: string[], maxParallelRequests: number = 6, connectionType: 'keep-alive' | 'discovery'): void {
    async.eachLimit(addresses, maxParallelRequests, (address: string, eachCb: () => void) => {
      let host: IHost = {
        ipAddress: address || '',
        isAlive: false,
      };
      this.logService.log('in eachCB, host: ', host);
      this.testAndUpdateHost(host).subscribe((updatedHost: IHost) => {
        this.store$.dispatch(new networkActions.HostUpdateAction(updatedHost));
        eachCb();
      });
    }, (error) => {
      if (error) {
        this.logService.error('failed to reach host: ');
      }
      this.logService.warn('disüpatching checkkpopssibleHostDoneACron...');
      this.store$.dispatch(new networkActions.CheckPossibleHostsDoneAction(connectionType));

    });
  }

  public testAddresses(addresses: string[], maxParallelRequests: number = 6, connectionType: 'keep-alive' | 'discovery'): void {
    this.logService.log('testAdrress start');
    try {
      this._testAddressesNoChecks(addresses, maxParallelRequests, connectionType);
    } catch(error) {
      this.logService.warn('catched some error when testingAddressesNoChecks');
    }  
  }

  public testAndUpdateHost(host: IHost): Observable<IHost> {
    this.logService.log('testAndUpdateHost:: ');
    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.isAlive}`;
    this.logService.log('testAndUpadteHostCalled');
    let newHost: IHost = {
      ipAddress: host.ipAddress,
      isAlive: false
    };
    try {
      this.logService.log('start with requestservice:: ');
      return this.requestService.get(url).map((response => {
        this.logService.log('received response: ', response);
        let resObj = response.json();
        newHost.isAlive = resObj.isAlive || false;
        return newHost;
      }));
    } catch (error) {
      return Observable.create(newHost);
    }
  }

  constructor(private requestService: RequestService,
    private store$: Store<IAppStore>,
    private logService: LogService) {
  }

}

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
import { ObservableInput } from 'rxjs/Observable';
declare var window: any;

@Injectable()
export class NetworkService {

  public startDetection() {
    this.store$.dispatch(new networkActions.StartDetectionAction());
  }

  public testHost(host: IHost) {
    this.store$.dispatch(new networkActions.TestHostAction(host));
  }

  public calculatePossibleAddresses(localAddress: string, localSubnetMask: string) {
    let possibleAddresses: string[] = this._calculatePossibleAdresses(localAddress, localSubnetMask);
    this.store$.dispatch(new networkActions.PossibleAddressesCalculatedAction(possibleAddresses));
  }

  //@ todo: change implementation :)
  private _calculatePossibleAdresses(localAddress: string, localSubnetMask: string): string[] {
    let possibleAddresses: string[] = [];
    let networkPart = localAddress.substring(0, localAddress.lastIndexOf("."));
    if (localSubnetMask === '255.255.255.0') {
      for (let i = 1; i < 20; i++) {
        possibleAddresses.push(`${networkPart}.${i}`);
      }
    }
    return possibleAddresses;
  }

  public updateOrAdd(hosts: IHost[], updatedHost: IHost) {

    let index = hosts.findIndex((host => host.ipAddress === updatedHost.ipAddress));

    if (index > -1) {
      hosts[index] = updatedHost;
    } else {
      hosts.push(updatedHost);
    }

    return hosts;
  }

  public testAddresses(addresses: string[], maxParallelRequests: number = 6, connectionType: 'keep-alive' | 'once') {

    async.eachLimit(addresses, maxParallelRequests, (address: string, eachCb: () => void) => {
      let host: IHost = {
        ipAddress: address || '',
        isAlive: false,
        isPending: false,
      };
      this.testAndUpdateHost(host).subscribe((updatedHost: IHost) => {
        this.store$.dispatch(new networkActions.HostUpdateAction(updatedHost));
        eachCb();
      });
    }, (error) => {
      if (error) {
        this.logService.error('failed to reach host: ');
      }
      this.store$.dispatch(new networkActions.CheckPossibleHostsDone(connectionType));
    });
  }

  public testAndUpdateHost(host: IHost): Observable<IHost> {
    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.isAlive}`;
    this.logService.log('testAndUpadteHostCalled');
    let newHost: IHost = {
      ipAddress: host.ipAddress,
      hostname: host.hostname,
      isAlive: false,
      isPending: false
    };
    try {
      return this.requestService.get(url).map((response => {
        this.logService.log('received response: ', response);
        let resObj = response.json();
        this.logService.log('resObj::',   resObj);
        newHost.isAlive = resObj.isAlive || false;
        this.logService.log('responded in TestandUpdateHost');
        return newHost;
      }));
    } catch (error) {
      return Observable.create(newHost);
    }

    /*.catch((error: any, caught: Observable<IHost>) => {
        return Observable.create(<IHost>{
          ipAddress: host.ipAddress,
          hostname: host.hostname,
          isAlive: false,
          isPending: false
        });
      });*/
  }

  constructor(private requestService: RequestService,
    private store$: Store<IAppStore>,
    private logService: LogService) {
  }

}

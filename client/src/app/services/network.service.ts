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
    possibleAddresses.push(localAddress);
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
    let activeRequestCount = 0;
    let _next = (next: () => void) => {
      let ipAddress;
      if (ipAddress = addresses.pop()) {
        activeRequestCount++;
        let host: IHost = {
          ipAddress: ipAddress,
          isAlive: false,
          isPending: false,
        };
        this.logService.log('testing host_ ', host.ipAddress);
        this.testAndUpdateHost(host).subscribe((updatedHost: IHost) => {
          this.store$.dispatch(new networkActions.HostUpdateAction(updatedHost));
          activeRequestCount--;
          next();
        });
      } else {
        next();
      }
    }

    let _done = () => {
      this.store$.dispatch(new networkActions.CheckPossibleHostsDone(connectionType));
    };

    for (let i = maxParallelRequests - 1; i > -1; i--) {
      let executeOne = () => {
        if(activeRequestCount === 0 && addresses.length!) {
          return _done();
        } else {
          _next(executeOne);
        }
      }
    }
  }

  public testAndUpdateHost(host: IHost): Observable<IHost> {
    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.isAlive}`;

    return this.requestService.get(url).switchMap((response => {
      let resObj = JSON.parse(response.text.toString());
      this.logService.log('received response: ', response.text);
      let newHost: IHost = {
        ipAddress: host.ipAddress,
        hostname: host.hostname,
        isAlive: resObj.isAlive,
        isPending: false
      };

      return Observable.create(newHost);
    }));
  }

  constructor(private requestService: RequestService,
    private store$: Store<IAppStore>,
    private logService: LogService) {
  }

}

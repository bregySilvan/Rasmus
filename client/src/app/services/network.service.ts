import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { IHost } from '../state/network.reducer';
import { DEFAULT_PORT, LOCATIONS } from '../../../../config';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import * as networkActions from '../actions/network.actions';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';

@Injectable()
export class NetworkService {

  public startDetection() {
    this.store$.dispatch(new networkActions.StartDetectionAction());
  }

  public testHost(host: IHost) {
    this.store$.dispatch(new networkActions.TestHostAction(host));
  }

  //@ todo: change implementation :)
  public calculatePossibleAdresses(localAddress: string, localSubnetMask: string): string[] {
    if(this.possibleAddressesCache !== null) {
      return this.possibleAddressesCache;
    }
    let possibleAddresses: string[] = [];
    let networkPart = localAddress.substring(0, localAddress.lastIndexOf("."));
    if(localSubnetMask === '255.255.255.0') {
      for(let i = 1; i < 255; i++) {
        possibleAddresses.push(`${networkPart}.${i}`);
      }
    }
    return possibleAddresses;
  }

  public updateOrAdd(hosts: IHost[], updatedHost: IHost) {

    let index = hosts.findIndex((host => {
      return host.ipAddress === updatedHost.ipAddress;
    }));

    if(index > -1) {
      hosts[index] = updatedHost;
    } else {
      hosts.push(updatedHost);
    }

    return hosts;
  }


  public testAndUpdateHost(host: IHost): Observable<IHost> {
    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.isAlive}`;

    return this.requestService.get(url).switchMap((response => {
      let resObj = JSON.parse(response.text.toString());

      let newHost: IHost = {
        ipAddress: host.ipAddress,
        hostname: host.hostname,
        isAlive: resObj.isAlive,
        isPending: false
      };

      return Observable.of(newHost);
    }));
  }

  constructor(private requestService: RequestService,
              private store$: Store<IAppStore>) {

  }

}

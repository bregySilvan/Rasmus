import { RequestService } from './request.service';
import { Injectable } from '@angular/core';
import { IHost } from '../state/network.reducer';
import { DEFAULT_PORT, locations } from '../../../../config';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class NetworkService {

  public updateOrReplace(hosts: IHost[], updatedHost: IHost) {

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

  public testHost(host: IHost): Promise<IHost> {
    let url = `http://${host.ipAddress}:${DEFAULT_PORT}/${locations.isAlive}`;
    this.requestService.get(url).subscribe((response => {
      let resObj = JSON.parse(response.text);

      let newHost: IHost = {
        ipAddress: host.ipAddress,
        hostname: host.hostname,
        isAlive: resObj.isAlive,
        isPending: false
      }
    });
  }

  constructor(private requestService: RequestService) {

  }

}

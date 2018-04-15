import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LogService } from './log.service';


@Injectable()
export class RequestService {

    public constructor(private httpClient: http.Http,
                       private logService: LogService) {

    }

    public get(url: string, payload?: any): Observable<http.Response> {
      this.logService.log('GET in srequestservice with requestservice:: ');
      let options = { params: payload };
      let a: http.BaseRequestOptions
      return this.httpClient.get(url);

    }

    public post(url: string, payload?: any): Observable<http.Response> {
      this.logService.log('POST in srequestservice with requestservice:: ');
      let options = { params: payload };
      return this.httpClient.post(url, options);
    }
}

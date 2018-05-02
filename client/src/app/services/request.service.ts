import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LogService } from './log.service';
import 'rxjs/add/operator/catch'
import { _throw } from 'rxjs/observable/throw';

@Injectable()
export class RequestService {

  public constructor(private httpClient: http.Http,
    private logService: LogService) {

  }

  public readFile(file: string): Observable<any> {
    return this.httpClient.get(file).map(res => res.json());
  }

  public get(url: string, payload?: any): Observable<http.Response> {
    let options = { params: payload };
    let a: http.BaseRequestOptions
    return this.httpClient.get(url).catch((error: http.Response | any) => {
      //     this.logService.error(error.message || error);
      return _throw('Error when GET on ' + url + ' options: ' + JSON.stringify(options));
    });
  }

  public post(url: string, payload?: any): Observable<any> {
    this.logService.log('POST in srequestservice with requestservice:: ', url);
    let options = { params: payload };
    return this.httpClient.post(url, options).catch((error: http.Response | any) => {
      //     this.logService.error(error.message || error);
      this.logService.error('error when post : ', url);
      return Observable.create('unknown error occured');
     // return _throw('Error when GET on ' + url + ' options: ' + JSON.stringify(options));
    });;
  }
}

import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LogService } from './log.service';
import 'rxjs/add/operator/catch'
import { _throw } from 'rxjs/observable/throw';
import { Subscription } from 'rxjs';
import { IElement } from '../../../../interfaces';

const POST_HEADERS: http.Headers = new http.Headers({
  'Content-Type': 'application/json'
 // 'Access-Control-Allow-Origin': ['*']
});
/*
interface RequestOptionsArgs { 
  url?: string | null
  method?: string | RequestMethod | null
  search?: string | URLSearchParams | {...}
  params?: string | URLSearchParams | {...}
  headers?: Headers | null
  body?: any
  withCredentials?: boolean | null
  responseType?: ResponseContentType | null
}


*/
@Injectable()
export class RequestService {
/*
  executeHttp() {
    var headers = new http.Headers();
    headers.append('Content-Type', 'application/json');

    var content = JSON.stringify({
      name: 'my name'
    });

    return this.http.post(
      'https://angular2.apispark.net/v1/companies/', content, {
        headers: headers
      }).map(res => res.json()).subscribe(
        data => { console.log(data); },
        err => { console.log(err); }
      );
  }*/

  private postHeaders = POST_HEADERS;
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
     // this.logService.error(error);
      return _throw('Error when GET on ' + url + ' options: ' + JSON.stringify(options));
    });
  }
  //: Observable<http.Response>
  public post(url: string, payload?: IElement[]) {
    this.logService.log('POST in srequestservice with requestservice:: ', url);
    let body = payload ? JSON.stringify(payload) : '';
    let options: http.RequestOptions = new http.RequestOptions({ headers: this.postHeaders });
    return this.httpClient.post(url, body, options).subscribe(
      data => this.logService.log(data),
      err => { },// this.logService.error(err),
      () => this.logService.warn('completed post request'));
  }
}

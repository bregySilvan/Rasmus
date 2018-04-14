import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RequestService {

    public constructor(private httpClient: http.Http) {

    }

    public get(url: string, payload?: any): Observable<http.Response> {
      let options = { params: payload };
      return this.httpClient.get(url, options);

    }

    public post(url: string, payload?: any): Observable<http.Response> {
      let options = { params: payload };
      return this.httpClient.post(url, options);
    }
}

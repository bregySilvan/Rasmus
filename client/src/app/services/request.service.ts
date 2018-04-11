import { Injectable } from '@angular/core';
import * as http from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RequestService {

    public constructor(private httpClient: http.HttpClient) {

    }

    public get(url, payload): Observable<Response> {
      let options: RequestOptionsArgs = { params: { ''}};
      return this.httpClient.get(url,);

    }

    public post(url, payload): Observable<Object> {
      return this.httpClient.post(url, payload);
    }
}

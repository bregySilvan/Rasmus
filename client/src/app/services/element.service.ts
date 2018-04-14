import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ElementService {

    public constructor(private httpClient: http.Http) {

    }
}

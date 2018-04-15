import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LOCATIONS, DEFAULT_PORT } from '../../../../config';
import { RequestService } from './request.service';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';


@Injectable()
export class ElementService {

    public constructor(private requestService: RequestService) {

    }

    public getElements(keys: string[], host: IHost): Observable<Response> {
      let URL = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.elements}`;
      return this.requestService.get(URL, { keys: keys})

    }

    public postElement
}

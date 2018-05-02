import { IListElement, ElementTypes, IBoard } from '../../../../interfaces';
import { Injectable } from '@angular/core';
import { IDatabaseService } from '../base/database.service.base';
import { IHost } from '../state/network.reducer';
import { RequestService } from './request.service';
import { LogService } from './log.service';
import { Observable } from 'rxjs';
import { DEFAULT_PORT, LOCATIONS } from '../../../../config';
import { buildRequestUrl } from '../../utils/functions';

@Injectable()
export class DataService implements IDatabaseService {

  saveBoards(host: string, boards: IBoard[]): Observable<any> {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.boards);
    return this.requestService.post(URL, boards);
  }

  saveElements(host: string, elements: IListElement[]): Observable<any> {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.elements);
    return this.requestService.post(URL, elements);
  }

  getAllBoards(host: string): Observable<IBoard[]> {
    return this.getBoards(host, []);
  }

  getAllElements(host: string): Observable<IListElement[]> {
    return this.getElements(host, []);
  }

  public getElements(host: string, keys: string[]): Observable<IListElement[]> {
    this.logService.log('getting elements');
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.elements);
    return this.requestService.get(URL, { keys: keys}).map(res => res.json()).catch((error: any) => {
      this.logService.log('error=? ', error);
      return Observable.create([]);
    });
  }

  public getBoards(host: string, keys: string[]): Observable<IBoard[]> {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.boards);
    return this.requestService.get(URL, { keys: keys}).map(res => res.json()).catch((error: any) => {
      return Observable.create([]);
    });
  }

  constructor(private requestService: RequestService,
              private logService: LogService) {
    
  }

}

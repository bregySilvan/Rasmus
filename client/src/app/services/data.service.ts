
import { IElement, ElementTypes, IBoard } from '../../../../interfaces';
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

  saveBoards(host: string, boards: IBoard[]): void {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.boards);
    this.requestService.post(URL, boards);//.catch(err => {
    //  this.logService.error(err);
    //    return Observable.create(err);
    //   });
  }

  saveElements(host: string, elements: IElement[]): void {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.elements);
    this.requestService.post(URL, elements);
  }

  getAllBoards(host: string): Observable<IBoard[]> {
    return this.getBoards(host, []);
  }

  getAllElements(host: string): Observable<IElement[]> {
    return this.getElements(host, []);
  }

  public getElements(host: string, keys: string[]): Observable<IElement[]> {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.elements);
    return this.requestService.get(URL, { keys: keys }).map(res => res.json()).catch((error: any) => {
      this.logService.log('error=? ', error);
      return Observable.create([]);
    });
  }

  public getBoards(host: string, keys: string[]): Observable<IBoard[]> {
    let URL = buildRequestUrl(host, DEFAULT_PORT, LOCATIONS.boards);
    return this.requestService.get(URL, { keys: keys }).map(res => res.json()).catch((error: any) => {
      return Observable.create([]);
    });
  }

  constructor(private requestService: RequestService,
    private logService: LogService) {

  }
}

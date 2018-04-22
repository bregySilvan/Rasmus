import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LOCATIONS, DEFAULT_PORT } from '../../../../config';
import { RequestService } from './request.service';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';
import { IListElement, IBoard } from '../../../../interfaces';
import { LogService } from './log.service';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import * as elementActions from '../actions/element.actions';


@Injectable()
export class ElementService {

    public constructor(private requestService: RequestService,
                       private logService: LogService,
                       private store$: Store<IAppStore>) {

    }

    public tryElementsUpdate(elements: IListElement[]) {
      this.store$.dispatch(new elementActions.TryUpdateElementsAction(elements));
    }

    public tryBoardsUpdate(boards: IBoard[]) {
      this.store$.dispatch(new elementActions.TryUpdateBoardsAction(boards));
    }

    public getElements(host: IHost, keys?: string[]): Observable<IListElement[]> {
      let URL = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.elements}`;
      return this.requestService.get(URL, { keys: keys}).map(res => res.json());
    }

    public getBoards(host: IHost, keys?: string[]): Observable<IBoard[]> {
      let URL = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.boards}`;
      return this.requestService.get(URL, { keys: keys}).map(res => res.json());
    }


}

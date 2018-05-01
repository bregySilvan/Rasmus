import { Injectable } from '@angular/core';
import * as http from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LOCATIONS, DEFAULT_PORT } from '../../../../config';
import { RequestService } from './request.service';
import { IHost } from '../state/network.reducer';
import { Response } from '@angular/http';
import { IElement, IBoard } from '../../../../interfaces';
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

    public tryElementsUpdate(elements: IElement[]) {
      this.store$.dispatch(new elementActions.TryUpdateElementsAction(elements));
    }

    public tryBoardsUpdate(boards: IBoard[]) {
      this.store$.dispatch(new elementActions.TryUpdateBoardsAction(boards));
    }

    public saveElements(elements: IElement[]) {
      this.store$.dispatch(new elementActions.UpdateElementsAction(elements));
    }

    public saveBoards(boards: IBoard[]) {
      this.store$.dispatch(new elementActions.UpdateBoardsAction(boards));
    }

    public getElements(host: IHost, keys?: string[]): Observable<IElement[]> {
      let URL = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.elements}`;
      return this.requestService.get(URL, { keys: keys}).map(res => res.json()).catch((error: any) => {
        this.logService.log('error=? ', error);
        return Observable.create([]);
      });
    }

    public getBoards(host: IHost, keys?: string[]): Observable<IBoard[]> {
      let URL = `http://${host.ipAddress}:${DEFAULT_PORT}/${LOCATIONS.boards}`;
      return this.requestService.get(URL, { keys: keys}).map(res => res.json()).catch((error: any) => {
        return Observable.create([]);
      });
    }

    public areEqualBoards(board1: IBoard, board2: IBoard) {
      return  board1.key === board2.key;
    }

    public areEqualElements(element1: IElement, element2: IElement) {
      return element1.key === element2.key;
    }

}

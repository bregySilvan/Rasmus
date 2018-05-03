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

}

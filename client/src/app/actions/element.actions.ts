
import { Action } from '@ngrx/store';
import { IListElement, IBoard } from '../../../../interfaces';
import { type } from '../../utils/check-action-types';


const LOAD_AVAILABLE_ELEMENTS: 'ELEMENT: LOAD_AVAILABLE_ELEMENTS' = 'ELEMENT: LOAD_AVAILABLE_ELEMENTS';
const LOAD_AVAILABLE_BOARDS: 'ELEMENT: LOAD_AVAILABLE_BOARDS' = 'ELEMENT: LOAD_AVAILABLE_BOARDS';
const TRY_UPDATE_ELEMENTS: 'ELEMENT: TRY_UPDATE_ELEMENTS' = 'ELEMENT: TRY_UPDATE_ELEMENTS';
const TRY_UPDATE_BOARDS: 'ELEMENT: TRY_UPDATE_BOARDS' = 'ELEMENT: TRY_UPDATE_BOARDS';
const UPDATE_ELEMENTS: 'ELEMENT: UPDATE_ELEMENTS' = 'ELEMENT: UPDATE_ELEMENTS';
const UPDATE_BOARDS: 'ELEMENT: UPDATE_BOARDS' = 'ELEMENT: UPDATE_BOARDS';

export const ActionTypes = {
  LOAD_AVAILABLE_ELEMENTS: type(LOAD_AVAILABLE_ELEMENTS),
  LOAD_AVAILABLE_BOARDS: type(LOAD_AVAILABLE_BOARDS),
  TRY_UPDATE_ELEMENTS: type(TRY_UPDATE_ELEMENTS),
  TRY_UPDATE_BOARDS: type(TRY_UPDATE_BOARDS),
  UPDATE_ELEMENTS: type(UPDATE_ELEMENTS),
  UPDATE_BOARDS: type(UPDATE_BOARDS)
};

export class LoadAvailableElementsAction implements Action {
  type: typeof ActionTypes.LOAD_AVAILABLE_ELEMENTS = ActionTypes.LOAD_AVAILABLE_ELEMENTS;
  constructor() {
      //
  }
}

  export class LoadAvailableBoardsAction implements Action {
    type: typeof ActionTypes.LOAD_AVAILABLE_BOARDS = ActionTypes.LOAD_AVAILABLE_BOARDS;
    constructor() {
        //
    }
  }

  export class TryUpdateElementsAction implements Action {
    type: typeof ActionTypes.TRY_UPDATE_ELEMENTS = ActionTypes.TRY_UPDATE_ELEMENTS;
    payload: IListElement[];
    constructor(elements: IListElement[]) {
      this.payload = elements;
    }
  }

  export class TryUpdateBoardsAction implements Action {
    type: typeof ActionTypes.TRY_UPDATE_BOARDS = ActionTypes.TRY_UPDATE_BOARDS;
    payload: IBoard[];
    constructor(boards: IBoard[]) {
      this.payload = boards;
    }
  }

  export class UpdateElementsAction implements Action {
    type: typeof ActionTypes.UPDATE_ELEMENTS = ActionTypes.UPDATE_ELEMENTS;
    payload: IListElement[];
    constructor(elements: IListElement[]) {
      this.payload = elements;
    }
  }

  export class UpdateBoardsAction implements Action {
    type: typeof ActionTypes.UPDATE_BOARDS = ActionTypes.UPDATE_BOARDS;
    payload: IBoard[];
    constructor(boards: IBoard[]) {
      this.payload = boards;
    }
  }

  export type ElementActions = LoadAvailableElementsAction
    | LoadAvailableBoardsAction
    | TryUpdateElementsAction
    | TryUpdateBoardsAction
    | UpdateElementsAction
    | UpdateBoardsAction;

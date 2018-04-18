
import { Action } from '@ngrx/store';
import { type } from "../utils/check-action-types";
import { IListElement, IBoard } from '../../../../interfaces';


const LOAD_AVAILABLE_ELEMENTS: 'ELEMENT: LOAD_AVAILABLE_ELEMENTS' = 'ELEMENT: LOAD_AVAILABLE_ELEMENTS';
const LOAD_AVAILABLE_ELEMENTS_DONE: 'ELEMENT: LOAD_AVAILABLE_ELEMENTS_DONE' = 'ELEMENT: LOAD_AVAILABLE_ELEMENTS_DONE';
const LOAD_AVAILABLE_BOARDS: 'ELEMENT: LOAD_AVAILABLE_BOARDS' = 'ELEMENT: LOAD_AVAILABLE_BOARDS';
const LOAD_AVAILABLE_BOARDS_DONE: 'ELEMENT: LOAD_AVAILABLE_BOARDS_DONE' = 'ELEMENT: LOAD_AVAILABLE_BOARDS_DONE';
const SAVE_ELEMENT: 'ELEMENT: SAVE_ELEMENT' = 'ELEMENT: SAVE_ELEMENT';
const SAVE_BOARD: 'ELEMENT: SAVE_BOARD' = 'ELEMENT: SAVE_BOARD';

export const ActionTypes = {
  LOAD_AVAILABLE_ELEMENTS: type(LOAD_AVAILABLE_ELEMENTS),
  LOAD_AVAILABLE_ELEMENTS_DONE: type(LOAD_AVAILABLE_ELEMENTS_DONE),
  LOAD_AVAILABLE_BOARDS: type(LOAD_AVAILABLE_BOARDS),
  LOAD_AVAILABLE_BOARDS_DONE: type(LOAD_AVAILABLE_BOARDS_DONE),
  SAVE_ELEMENT: type(SAVE_ELEMENT),
  SAVE_BOARD: type(SAVE_BOARD)
};

export class LoadAvailableElementsAction implements Action {
  type: typeof ActionTypes.LOAD_AVAILABLE_ELEMENTS = ActionTypes.LOAD_AVAILABLE_ELEMENTS;
  constructor() {
      //
  }
}

export class LoadAvailableElementsDoneAction implements Action {
    type: typeof ActionTypes.LOAD_AVAILABLE_ELEMENTS_DONE = ActionTypes.LOAD_AVAILABLE_ELEMENTS_DONE;
    payload: IListElement[];
    constructor(elements: IListElement[]) {
      this.payload = elements;
    }
  }

  export class LoadAvailableBoardsAction implements Action {
    type: typeof ActionTypes.LOAD_AVAILABLE_BOARDS = ActionTypes.LOAD_AVAILABLE_BOARDS;
    constructor() {
        //
    }
  }

  export class LoadAvailableBoardsDoneAction implements Action {
    type: typeof ActionTypes.LOAD_AVAILABLE_BOARDS_DONE = ActionTypes.LOAD_AVAILABLE_BOARDS_DONE;
    payload: IBoard[];
    constructor(boards: IBoard[]) {
      this.payload = boards;
    }
  }

  export class SaveElementAction implements Action {
    type: typeof ActionTypes.SAVE_ELEMENT = ActionTypes.SAVE_ELEMENT;
    payload: IListElement;
    constructor(element: IListElement) {
      this.payload = element;
    }
  }

  export class SaveBoardAction implements Action {
    type: typeof ActionTypes.SAVE_BOARD = ActionTypes.SAVE_BOARD;
    payload: IBoard;
    constructor(board: IBoard) {
      this.payload = board;
    }
  }

  export type ElementActions = LoadAvailableElementsAction
    | LoadAvailableElementsDoneAction
    | LoadAvailableBoardsAction
    | LoadAvailableBoardsDoneAction
    | SaveElementAction
    | SaveBoardAction;
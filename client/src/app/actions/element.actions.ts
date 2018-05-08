
import { Action } from '@ngrx/store';
import { IElement, IBoard } from '../../../../interfaces';
import { type } from '../../utils/check-action-types';


const LOAD_AVAILABLE_ELEMENTS: 'ELEMENT: LOAD_AVAILABLE_ELEMENTS' = 'ELEMENT: LOAD_AVAILABLE_ELEMENTS';
const TRY_UPDATE_ELEMENTS: 'ELEMENT: TRY_UPDATE_ELEMENTS' = 'ELEMENT: TRY_UPDATE_ELEMENTS';
const UPDATE_ELEMENTS: 'ELEMENT: UPDATE_ELEMENTS' = 'ELEMENT: UPDATE_ELEMENTS';
const SAVE_ELEMENTS: 'ELEMENT: SAVE_ELEMENTS' = 'ELEMENT: SAVE_ELEMENTS';


export const ActionTypes = {
  LOAD_AVAILABLE_ELEMENTS: type(LOAD_AVAILABLE_ELEMENTS),
  TRY_UPDATE_ELEMENTS: type(TRY_UPDATE_ELEMENTS),
  UPDATE_ELEMENTS: type(UPDATE_ELEMENTS),
  SAVE_ELEMENTS: type(SAVE_ELEMENTS)
}; 

export class LoadAvailableElementsAction implements Action {
  type: typeof ActionTypes.LOAD_AVAILABLE_ELEMENTS = ActionTypes.LOAD_AVAILABLE_ELEMENTS;
  constructor() {
      //
  }
}

  export class TryUpdateElementsAction implements Action {
    type: typeof ActionTypes.TRY_UPDATE_ELEMENTS = ActionTypes.TRY_UPDATE_ELEMENTS;
    payload: IElement[];
    constructor(elements: IElement[]) {
      this.payload = elements;
    }
  }
  export class UpdateElementsAction implements Action {
    type: typeof ActionTypes.UPDATE_ELEMENTS = ActionTypes.UPDATE_ELEMENTS;
    payload: IElement[];
    constructor(elements: IElement[]) {
      this.payload = elements;
    }
  }


  export class SaveElementAction implements Action {
    type: typeof ActionTypes.SAVE_ELEMENTS = ActionTypes.SAVE_ELEMENTS;
    payload: IElement[];
    constructor(elements: IElement[]) {
      this.payload = elements;
    }
  }

  export type ElementActions = LoadAvailableElementsAction
    | TryUpdateElementsAction
    | UpdateElementsAction
    | SaveElementAction;

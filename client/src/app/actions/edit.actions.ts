import { type } from '../../utils/check-action-types';
import { Action } from '@ngrx/store';


const START_EDIT_ELEMENT: 'EDIT: START_EDIT_ELEMENT' = 'EDIT: START_EDIT_ELEMENT';
const EDIT_ELEMENT_COMPLETE: 'EDIT: EDIT_ELEMENT_COMPLETE' = 'EDIT: EDIT_ELEMENT_COMPLETE';
//const START_EDIT_BOARD: 'EDIT: START_EDIT_BOARD' = 'EDIT: START_EDIT_BOARD';
//const EDIT_BOARD_COMPLETE: 'EDIT: EDIT_BOARD_COMPLETE' = 'EDIT: EDIT_BOARD_COMPLETE';
const LOAD_CONTAINERS: 'EDIT: LOAD_CONTAINERS' = 'EDIT: LOAD_CONTAINERS';
const LOAD_CONTAINERS_COMPLETE: 'EDIT: LOAD_CONTAINERS_COMPLETE' = 'EDIT: LOAD_CONTAINERS_COMPLETE';
const UPDATE_CONTAINERS: 'EDIT: UPDATE_CONTAINERS' = 'EDIT: UPDATE_CONTAINERS';

export const ActionTypes = {
    START_EDIT_ELEMENT: type(START_EDIT_ELEMENT),
    EDIT_ELEMENT_COMPLETE: type(EDIT_ELEMENT_COMPLETE),
  //  START_EDIT_BOARD: type(START_EDIT_BOARD),
  //  EDIT_BOARD_COMPLETE: type(EDIT_BOARD_COMPLETE),
    LOAD_CONTAINERS: type(LOAD_CONTAINERS),
    LOAD_CONTAINERS_COMPLETE: type(LOAD_CONTAINERS_COMPLETE),
    UPDATE_CONTAINERS: type(UPDATE_CONTAINERS)
  }; 
  
  export class StartEditElementAction implements Action {
    type: typeof ActionTypes.START_EDIT_ELEMENT = ActionTypes.START_EDIT_ELEMENT;
    constructor() {
        //
    }
  }

  export class EditElementCompleteAction implements Action {
    type: typeof ActionTypes.EDIT_ELEMENT_COMPLETE = ActionTypes.EDIT_ELEMENT_COMPLETE;
    constructor() {
        //
    }
  }
/*
  export class StartEditBoardAction implements Action {
    type: typeof ActionTypes.START_EDIT_BOARD = ActionTypes.START_EDIT_BOARD;
    constructor() {
        //
    }
  }

  export class EditBoardCompleteAction implements Action {
    type: typeof ActionTypes.EDIT_BOARD_COMPLETE = ActionTypes.EDIT_BOARD_COMPLETE;
    constructor() {
        //
    }
  }*/

  export class LoadContainersAction implements Action {
    type: typeof ActionTypes.LOAD_CONTAINERS = ActionTypes.LOAD_CONTAINERS;
    constructor() {
        //
    }
  }

  export class LoadContainersCompleteAction implements Action {
    type: typeof ActionTypes.LOAD_CONTAINERS_COMPLETE = ActionTypes.LOAD_CONTAINERS_COMPLETE;
    constructor() {
        //
    }
  }

  export type EditActions = StartEditElementAction
    | EditElementCompleteAction
  //  | StartEditBoardAction
 //   | EditBoardCompleteAction
    | LoadContainersAction
    | LoadContainersCompleteAction;
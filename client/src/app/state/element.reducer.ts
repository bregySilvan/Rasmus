import * as actions from '../actions/element.actions';
import { IHost } from './network.reducer';
import { IListElement, IBoard } from '../../../../interfaces';


export interface IElementState {
    availableElements: IListElement[];
    availableBoards: IBoard[];
}

const initialState: IElementState = {
    availableBoards: [],
    availableElements: []
};


export function elementReducer(state: IElementState = initialState, action: actions.ElementActions): IElementState {
  switch (action.type) {

    case actions.ActionTypes.LOAD_AVAILABLE_BOARDS_DONE:
      return Object.assign({}, state, {
        availableBoards: action.payload
      });

    case actions.ActionTypes.LOAD_AVAILABLE_ELEMENTS_DONE:
      return Object.assign({}, state, {
        availableElements: action.payload
      });

    default:
      return Object.assign({}, state);
  }
}

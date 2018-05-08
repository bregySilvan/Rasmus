import * as actions from '../actions/element.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard } from '../../../../interfaces';


export interface IElementState {
    availableElements: IElement[];
}

const initialState: IElementState = {
    availableElements: []
};


export function elementReducer(state: IElementState = initialState, action: actions.ElementActions): IElementState {
  switch (action.type) {

    case actions.ActionTypes.UPDATE_ELEMENTS:
      return Object.assign({}, state, {
        availableElements: action.payload
      });

    default:
      return Object.assign({}, state);
  }
}

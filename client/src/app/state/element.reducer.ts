import * as actions from '../actions/element.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard } from '../../../../interfaces';
import { element } from 'protractor';
import { ALL_AVAILABLE_ADS_LIST } from '../../../../config';


const usedLists: IBoard[] = [
  {
    key: ALL_AVAILABLE_ADS_LIST,
    type: 'board',
    elements: [],
  },
  {
    key: ALL_AVAILABLE_ADS_LIST+1,
    type: 'board',
    elements: [],
  }
]
export interface IElementState {
    availableElements: IElement[];
}

const initialState: IElementState = {
    availableElements: usedLists
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

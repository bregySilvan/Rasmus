import * as actions from '../actions/element.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard, IContainer } from '../../../../interfaces';
import { element } from 'protractor';
import { ALL_AVAILABLE_ADS_LIST } from '../../../../config';


const usedLists: IContainer[] = [
  {
    key: ALL_AVAILABLE_ADS_LIST,
    type: 'container',
    elements: [],
    contentType: 'advertisement'
  },
  {
    key: ALL_AVAILABLE_ADS_LIST+1,
    type: 'container',
    elements: [],
    contentType: 'advertisement'
  }
];

export interface IElementState {
    availableElements: IElement[];
    containers: IContainer[];
}

const initialState: IElementState = {
    availableElements: [],
    containers: usedLists
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

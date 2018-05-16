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
// 'advertisement' | 'board' | 'empty' | 'container'
export interface IElementState {
    allElements: IElement[];
    advertisements: IElement[];
    containers: IElement[];
    empty: IElement[],
    boards: IBoard[],
}

const initialState: IElementState = {
    advertisements: [],
    containers: usedLists,
    empty: [],
    boards: [],
    allElements: []
};


export function elementReducer(state: IElementState = initialState, action: actions.ElementActions): IElementState {
  console.warn('elemnent reducer,,', action);
  switch (action.type) {

    case actions.ActionTypes.UPDATE_ELEMENTS:
    
      let allElements = action.payload.filter(el => !!el);
      return Object.assign({}, state, {
        elements: allElements.filter(el => el.type === 'advertisement'),
        containers: allElements.filter(el => el.type === 'container'),
        empty: allElements.filter(el => el.type === 'empty'),
        boards: allElements.filter(el => el.type === 'board'),
        allElements: allElements
      });
// 'advertisement' | 'board' | 'empty' | 'container'
    default:
      return Object.assign({}, state);
  }
}

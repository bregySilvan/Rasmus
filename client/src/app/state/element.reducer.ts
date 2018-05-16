import * as actions from '../actions/element.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard, IContainer, ElementTypes } from '../../../../interfaces';
import { element } from 'protractor';
import { ALL_AVAILABLE_ADS_LIST } from '../../../../config';
import { unionDistinct, unionElementsDistinct } from '../../utils/functions';


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

function filterAndUnion(current: IElement[], update: IElement[], type: ElementTypes): IElement[] {
  current = current.filter(el => el.type === type)
  return unionElementsDistinct(update, current).unionArr;
}

export function elementReducer(state: IElementState = initialState, action: actions.ElementActions): IElementState {
  switch (action.type) {

    case actions.ActionTypes.UPDATE_ELEMENTS:
    
      let allElements = action.payload.filter(el => !!el);
      console.warn('allEls:: ', allElements);
      return Object.assign({}, state, {
        advertisemenets: filterAndUnion(state.allElements, allElements, 'advertisement'),
        containers: filterAndUnion(state.allElements, allElements, 'container'),
        empty: filterAndUnion(state.allElements, allElements, 'empty'),
        boards: filterAndUnion(state.allElements, allElements, 'board'),
        allElements: allElements
      });

    default:
      return Object.assign({}, state);
  }
}

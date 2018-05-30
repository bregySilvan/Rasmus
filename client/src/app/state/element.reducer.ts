import * as actions from '../actions/element.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard, IContainer, ElementTypes } from '../../../../interfaces';
import { element } from 'protractor';
import { ALL_AVAILABLE_ADS_LIST } from '../../../../config';
import { unionDistinct, unionElementsDistinct } from '../../utils/functions';


const usedLists: IContainer[] = [

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
  update = update.filter(el => el.type === type);
  
  return unionElementsDistinct(update, current).unionArr;
}

export function elementReducer(state: IElementState = initialState, action: actions.ElementActions): IElementState {
  switch (action.type) {

    case actions.ActionTypes.UPDATE_ELEMENTS:
    
      let allElements = action.payload.filter(el => !!el);

      return Object.assign({}, state, {
        advertisements: filterAndUnion(state.advertisements, allElements, 'advertisement'),
        containers: filterAndUnion(state.containers, allElements, 'container'),
        empty: filterAndUnion(state.empty, allElements, 'empty'),
        boards: filterAndUnion(state.boards, allElements, 'board'),
        allElements: unionElementsDistinct(state.allElements, allElements).unionArr
      });

    default:
      return Object.assign({}, state);
  }
}

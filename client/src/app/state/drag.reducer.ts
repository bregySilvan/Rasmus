import * as actions from '../actions/drag.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard } from '../../../../interfaces';
import { NO_ITEM_KEY } from '../../../../config';

export interface IDragInfo {
  element: IElement;
  index: number;
  dragContainerKey: string;
}

export interface IDragSettings {
    source: 'keep' | 'remove',
    target: 'replace' | 'insert' | 'add' | 'remove' 
}

export interface IDragState {
  currentDragInfo: IDragInfo;
  isDragging: boolean;
  canDrop: boolean;
  hoveringItemParentKey?: string;
}

const initialListElement: IDragInfo = { element: { type: 'empty', key: '42' }, index: -1, dragContainerKey: NO_ITEM_KEY };

const initialState: IDragState = {
  currentDragInfo: initialListElement,
  isDragging: false,
  canDrop: false
};

export function dragReducer(state: IDragState = initialState, action: actions.DragActionTypes): IDragState {
  switch (action.type) {

    case actions.ActionTypes.START:
      return Object.assign({}, state, {
        isDragging: true,
        canDrop: false,
        dragInfo: action.payload
      });

    case actions.ActionTypes.DROP:
      return Object.assign({}, state, {
        isDragging: false,
        canDrop: false,
        hoveringItemParentKey: undefined
      });

    case actions.ActionTypes.STOP:
      return Object.assign({}, state, {
        isDragging: false,
        canDrop: false,
        hoveringItemParentKey: undefined
      });

    case actions.ActionTypes.HOVER_DRAGGABLE_ITEM_ENTER:
      return Object.assign({}, state, {
        canDrop: true, // add check if can drop here..
        hoveringItemParentKey: action.payload,
      });

    case actions.ActionTypes.HOVER_DRAGGABLE_ITEM_LEAVE:
      return Object.assign({}, state, {
        canDrop: false,
        hoveringItemParentKey: undefined
      });

    default:
      return Object.assign({}, state);
  }
}

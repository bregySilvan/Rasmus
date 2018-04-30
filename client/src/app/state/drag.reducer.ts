import * as actions from '../actions/drag.actions';
import { IHost } from './network.reducer';
import { IListElement, IBoard, IDragInfo } from '../../../../interfaces';

export interface IDragState {
  dragInfo: IDragInfo;
  isDragging: boolean;
  canDrop: boolean;
  hoveringItemParentKey?: string;
  sourceItemParentKey?: string;
}

const initialListElement: IDragInfo = { element: { type: 'empty', key: '42' }, index: -1 };

const initialState: IDragState = {
  dragInfo: initialListElement,
  isDragging: false,
  canDrop: false
};


export function dragReducer(state: IDragState = initialState, action: actions.DragActionTypes): IDragState {
  switch (action.type) {

    case actions.ActionTypes.START:
      return Object.assign({}, state, {
        isDragging: true,
        canDrop: false,
        sourceItemParentKey: action.payload
      });

    case actions.ActionTypes.DROP:
      return Object.assign({}, state, {
        isDragging: false,
        canDrop: false
      });

    case actions.ActionTypes.STOP:
      return Object.assign({}, state, {
        isDragging: false,
        canDrop: false
      });

    case actions.ActionTypes.HOVER_DRAGGABLE_ITEM_ENTER:
      return Object.assign({}, state, {
        canDrop: true,
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

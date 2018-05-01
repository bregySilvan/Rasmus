import * as actions from '../actions/drag.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard } from '../../../../interfaces';
import { NO_ITEM_KEY } from '../../../../config';
import { DragContainer } from '../base-classes/drag-container.base';

export interface IDragInfo {
  element: IElement;
  index: number;
  dragContainerKey: string;
}

export interface IDragState {
  dragInfo: IDragInfo;
  isDragging: boolean;
  canDrop: boolean;
  hoveringItemParentKey?: string;
  draggableElements: { [key: string]: IElement[] };
}

const initialListElement: IDragInfo = { element: { type: 'empty', key: '42' }, index: -1, dragContainerKey: NO_ITEM_KEY };

const initialState: IDragState = {
  dragInfo: initialListElement,
  isDragging: false,
  canDrop: false,
  draggableElements: {}
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
        canDrop: true,
        hoveringItemParentKey: action.payload,
      });

    case actions.ActionTypes.HOVER_DRAGGABLE_ITEM_LEAVE:
      return Object.assign({}, state, {
        canDrop: false,
        hoveringItemParentKey: undefined
      });

    case actions.ActionTypes.REGISTER_DRAG_CONTAINER:
      let draggables = state.draggableElements;
      draggables[action.payload.getKey()] = action.payload.elements;
      return Object.assign({}, state, {
        draggableElements: draggables
      });

    case actions.ActionTypes.UPDATE_DRAG_CONTAINER:
      let _draggables = state.draggableElements;
      let keys = Object.keys(_draggables);
      if(!keys.includes(action.payload.dragContainerKey) || !!action.payload.element) {
        return state;
      }

      let dragElements = _draggables[action.payload.dragContainerKey];
      let index = dragElements.findIndex(element => element.key === action.payload.element.key)
      if(index > -1) {
        dragElements[index] = action.payload.element;
      } else {
        dragElements.push(action.payload.element);
      }
      _draggables[action.payload.dragContainerKey] = dragElements;

      return Object.assign({}, state, {
        draggableElements: _draggables
      });

    default:
      return Object.assign({}, state);
  }
}

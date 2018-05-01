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

}

export interface IDragState {
  currentDragInfo: IDragInfo;
  isDragging: boolean;
  canDrop: boolean;
  hoveringItemParentKey?: string;
  dragContainers: { [key: string]: IDragSettings };
}

const initialListElement: IDragInfo = { element: { type: 'empty', key: '42' }, index: -1, dragContainerKey: NO_ITEM_KEY };

const initialState: IDragState = {
  currentDragInfo: initialListElement,
  isDragging: false,
  canDrop: false,
  dragContainers: {}
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

    case actions.ActionTypes.UPDATE_DRAG_CONTAINER:
      let _dragContainers = state.dragContainers;
      _dragContainers[action.payload.dragContainerKey] = action.payload;

      return Object.assign({}, state, {
        dragContainers: _dragContainers
      });

    default:
      return Object.assign({}, state);
  }
}

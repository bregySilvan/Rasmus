import * as actions from '../actions/drag.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard } from '../../../../interfaces';
import { NO_ITEM_KEY } from '../../../../config';
import { LogService } from '../services/log.service';

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
  isDragging: boolean;
  canDrop: boolean;
}
declare var console: any;

const initialListElement: IDragInfo = { element: { type: 'empty', key: '42' }, index: -1, dragContainerKey: NO_ITEM_KEY };

const initialState: IDragState = {
  isDragging: false,
  canDrop: false,
};

export function dragReducer(state: IDragState = initialState, action: actions.DragActionTypes): IDragState {
  switch (action.type) {

    case actions.ActionTypes.START:
      return Object.assign({}, state, {
        isDragging: true
      });

    case actions.ActionTypes.DROP:
    return Object.assign({}, state, {
      isDragging: false
    });

    case actions.ActionTypes.STOP:
      return Object.assign({}, state, {
        isDragging: false
      });

    case actions.ActionTypes.DROP_STATE_CHANGE_DONE:
      return Object.assign({}, state, {
     //   canDrop: action.payload
      });

    case actions.ActionTypes.UPDATE_DRAG_CONTAINER:
      return Object.assign({}, state, {
        canDrop: false
      });

    default:
      return Object.assign({}, state);
  }
}

import { type } from '../../utils/check-action-types';
import { Action } from '@ngrx/store';
import { IElement } from '../../../../interfaces';
import { IDragInfo } from '../state/drag.reducer';

const START: 'DRAG: START' = 'DRAG: START';
const DROP: 'DRAG: START' = 'DRAG: START';
const STOP: 'DRAG: STOP' = 'DRAG: STOP';
const HOVER_DRAGGABLE_ITEM_ENTER: 'DRAG: HOVER_DRAGGABLE_ITEM_ENTER' = 'DRAG: HOVER_DRAGGABLE_ITEM_ENTER';
const HOVER_DRAGGABLE_ITEM_LEAVE: 'DRAG: HOVER_DRAGGABLE_ITEM_LEAVE' = 'DRAG: HOVER_DRAGGABLE_ITEM_LEAVE';
const UPDATE_DRAG_CONTAINER: 'DRAG: UPDATE_DRAG_CONTAINER' = 'DRAG: UPDATE_DRAG_CONTAINER';

export const ActionTypes = {
  START: type(START),
  DROP: type(DROP),
  STOP: type(STOP),
  HOVER_DRAGGABLE_ITEM_ENTER: type(HOVER_DRAGGABLE_ITEM_ENTER),
  HOVER_DRAGGABLE_ITEM_LEAVE: type(HOVER_DRAGGABLE_ITEM_LEAVE),
  UPDATE_DRAG_CONTAINER: type(UPDATE_DRAG_CONTAINER)
}

export class DragStartAction implements Action {
    type: typeof START = ActionTypes.START;
    payload: IDragInfo;
    constructor(dragInfo: IDragInfo) {
        this.payload = dragInfo;
    }
}

export class DropAction implements Action {
    type: typeof ActionTypes.DROP = ActionTypes.DROP;
    payload: string;
    constructor(targetParentKey: string) {
        this.payload = targetParentKey;
    }
}

export class DragStopAction implements Action {
    type: typeof ActionTypes.STOP = ActionTypes.STOP;
    constructor() {
        //
    }
}

export class HoverDraggableItemEnterAction implements Action {
    type: typeof ActionTypes.HOVER_DRAGGABLE_ITEM_ENTER = ActionTypes.HOVER_DRAGGABLE_ITEM_ENTER;
    payload: string;
    constructor(hoveringItemKey: string) {
        this.payload = hoveringItemKey;
    }
}

export class HoverDraggableItemLeaveAction implements Action {
    type: typeof ActionTypes.HOVER_DRAGGABLE_ITEM_LEAVE = ActionTypes.HOVER_DRAGGABLE_ITEM_LEAVE;
    constructor() {
        //
    }
}

export class UpdateDragContainerAction implements Action {
    type: typeof ActionTypes.UPDATE_DRAG_CONTAINER = ActionTypes.UPDATE_DRAG_CONTAINER;
    payload: IDragInfo;
    constructor(info: IDragInfo) {
        this.payload = info;
    }
}

export type DragActionTypes = DragStartAction
        | DropAction
        | DragStopAction
        | HoverDraggableItemEnterAction
        | HoverDraggableItemLeaveAction
        | UpdateDragContainerAction;
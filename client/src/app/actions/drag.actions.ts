import { type } from '../../utils/check-action-types';
import { Action } from '@ngrx/store';
import { IElement } from '../../../../interfaces';
import { IDragInfo } from '../state/drag.reducer';

const START: 'DRAG: START' = 'DRAG: START';
const DROP: 'DRAG: DROP' = 'DRAG: DROP';
const STOP: 'DRAG: STOP' = 'DRAG: STOP';
const HOVER_ITEM: 'DRAG: HOVER_ITEM' = 'DRAG: HOVER_ITEM';
const HOVER_DRAGGABLE_ITEM_LEAVE: 'DRAG: HOVER_DRAGGABLE_ITEM_LEAVE' = 'DRAG: HOVER_DRAGGABLE_ITEM_LEAVE';
const UPDATE_DRAG_CONTAINER: 'DRAG: UPDATE_DRAG_CONTAINER' = 'DRAG: UPDATE_DRAG_CONTAINER';
const DROP_STATE_CHANGE: 'DRAG: DROP_STATE_CHANGE' = 'DRAG: DROP_STATE_CHANGE';
const DROP_STATE_CHANGE_DONE: 'DRAG: DROP_STATE_CHANGE_DONE' = 'DRAG: DROP_STATE_CHANGE_DONE';

export const ActionTypes = {
    START: type(START),
    DROP: type(DROP),
    STOP: type(STOP),
    HOVER_ITEM: type(HOVER_ITEM),
    UPDATE_DRAG_CONTAINER: type(UPDATE_DRAG_CONTAINER),
    DROP_STATE_CHANGE: type(DROP_STATE_CHANGE),
    DROP_STATE_CHANGE_DONE: type(DROP_STATE_CHANGE_DONE)
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
    payload: IDragInfo;
    constructor(hoverItem: IDragInfo) {
        this.payload = hoverItem;
    }
}

export class DragStopAction implements Action {
    type: typeof ActionTypes.STOP = ActionTypes.STOP;
    constructor() {
        //
    }
}

export class HoverItemAction implements Action {
    type: typeof ActionTypes.HOVER_ITEM = ActionTypes.HOVER_ITEM;
    payload: { newState: boolean; dragInfo?: IDragInfo };
    constructor(newState: boolean, dragInfo?: IDragInfo) {
        this.payload = { newState, dragInfo };
    }
}

export class UpdateDragContainerAction implements Action {
    type: typeof ActionTypes.UPDATE_DRAG_CONTAINER = ActionTypes.UPDATE_DRAG_CONTAINER;
    payload: IDragInfo;
    constructor(info: IDragInfo) {
        this.payload = info;
    }
}

export class DropStateChangeAction implements Action {
    type: typeof ActionTypes.DROP_STATE_CHANGE = ActionTypes.DROP_STATE_CHANGE;
    payload: boolean;
    constructor(newState: boolean) {
        this.payload = newState;
    }
}
//DROP_STATE_CHANGE_DONE

export class DropStateChangeDoneAction implements Action {
    type: typeof ActionTypes.DROP_STATE_CHANGE_DONE = ActionTypes.DROP_STATE_CHANGE_DONE;
    payload: { newState: boolean; dragInfo?: IDragInfo };
    constructor(newState: boolean, dragInfo?: IDragInfo) {
        this.payload = { newState, dragInfo };
    }
}

export type DragActionTypes = DragStartAction
    | DropAction
    | DragStopAction
    | HoverItemAction
    | UpdateDragContainerAction
    | DropStateChangeAction
    | DropStateChangeDoneAction;

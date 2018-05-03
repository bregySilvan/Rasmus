
import { Action } from '@ngrx/store';
import { type } from '../../utils/check-action-types';

const START_NAVIGATION: 'ROUTER: START_NAVIGATION' = 'ROUTER: START_NAVIGATION';
const NAVIGATE_TO: 'ROUTER: NAVIGATE_TO' = 'ROUTER: NAVIGATE_TO';
const NAVIGATION_SUCCESS: 'ROUTER: NAVIGATION_SUCCESS' = 'ROUTER: NAVIGATION_SUCCESS';
const NAVIGATION_ERROR: 'ROUTER: NAVIGATION_ERROR' = 'ROUTER: NAVIGATION_ERROR';

export const ActionTypes = {
    START_NAVIGATION: type(START_NAVIGATION),
    NAVIGATE_TO: type(NAVIGATE_TO),
    NAVIGATION_SUCCESS: type(NAVIGATION_SUCCESS),
    NAVIGATION_ERROR: type(NAVIGATION_ERROR),
};

export class StartNavigationAction implements Action {
    type: typeof ActionTypes.START_NAVIGATION = ActionTypes.START_NAVIGATION;
    payload: string;
    constructor(url: string) {
        this.payload = url;
    }
}

export class NavigateTo implements Action {
    type: typeof ActionTypes.NAVIGATE_TO = ActionTypes.NAVIGATE_TO;
    payload: string;
    constructor(url: string) {
        this.payload = url;
    }
}

export class NavigationSuccess implements Action {
    type: typeof ActionTypes.NAVIGATION_SUCCESS = ActionTypes.NAVIGATION_SUCCESS;
    payload: string;
    constructor(url: string) {
        this.payload = url;
    }
}

export class NavigationError implements Action {
    type: typeof ActionTypes.NAVIGATION_ERROR = ActionTypes.NAVIGATION_ERROR;
    payload: Error;
    constructor(error: Error) {
        this.payload = error;
    }
}

export type RouterActions = StartNavigationAction | NavigateTo | NavigationSuccess | NavigationError;

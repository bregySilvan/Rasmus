

import { IRouterState, routerReducer } from './state/router.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { INetworkState, networkReducer } from './state/network.reducer';
import { IElementState, elementReducer } from './state/element.reducer';
import { IDragState, dragReducer } from './state/drag.reducer';

export interface IAppStore {
    router: IRouterState;
    network: INetworkState;
    element: IElementState;
    drag: IDragState;
}

export const RASMUS_STORE = {
    router: routerReducer,
    network: networkReducer,
    element: elementReducer,
    drag: dragReducer
}

const reducers = RASMUS_STORE;

const rasmusReducer: ActionReducer<IAppStore> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    return rasmusReducer(state, action);
}

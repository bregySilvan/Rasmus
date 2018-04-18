

import { IRouterState, routerReducer } from './state/router.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { INetworkState, networkReducer } from './state/network.reducer';
import { IElementState, elementReducer } from './state/element.reducer';

export interface IAppStore {
    router: IRouterState;
    network: INetworkState;
    element: IElementState;
}

export const RASMUS_STORE = {
    router: routerReducer,
    network: networkReducer,
    element: elementReducer
}

const reducers = RASMUS_STORE;

const rasmusReducer: ActionReducer<IAppStore> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    return rasmusReducer(state, action);
}

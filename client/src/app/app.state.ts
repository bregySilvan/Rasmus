

import { IRouterState, routerReducer } from './state/router.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { INetworkState, networkReducer } from './state/network.reducer';

export interface IAppStore {
    router: IRouterState;
    network: INetworkState;
}

export const RASMUS_STORE = {
    router: routerReducer,
    network: networkReducer
}

const reducers = RASMUS_STORE;

const rasmusReducer: ActionReducer<IAppStore> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    return rasmusReducer(state, action);
}

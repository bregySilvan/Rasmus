

import { IRouterState, routerReducer } from './state/router.reducer';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export interface IAppStore {
    router: IRouterState;
}

export const RASMUS_STORE = {
    router: routerReducer
}

const reducers = RASMUS_STORE;

const rasmusReducer: ActionReducer<IAppStore> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
    return rasmusReducer(state, action);
}
import * as actions from '../actions/router.actions';

export interface IRouterState {
    currentUrl: string;
    isNavigating: false;
    requestedUrl: string;
}


export function reducer(state: IRouterState = initialState, action: actions.RouterActions): IRouterState {
    switch (action.type) {
      case actions.ActionTypes.NAVIGATE_TO:
        return Object.assign({}, state, {
            isNavigating: true,
            requestedUrl: action.payload
        });

        case actions.ActionTypes.NAVIGATE_TO:
          return Object.assign({}, state, {
            isNavigating: true,
            requestedUrl: action.payload
        });
            
        case actions.ActionTypes.NAVIGATE_TO:
          return Object.assign({}, state, {
            isNavigating: true,
            requestedUrl: action.payload
          });

        default:
          return Object.assign({}, state);
    }
}

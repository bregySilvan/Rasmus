import * as actions from '../actions/network.actions';

export interface IHost {
  ipAddress: string;
  hostname: false;
  isPending: boolean;
  isAlive: boolean;
}

export interface INetworkState {
  knownHosts: IHost[];
  isDetecting: boolean;
}

const initialState: INetworkState = {
  knownHosts: [],
  isDetecting: false
};

export function networkReducer(state: INetworkState = initialState, action: actions.NetworkActions): INetworkState {
  switch (action.type) {
    case actions.ActionTypes.START_DETECTION:
      return Object.assign({}, state, {
        isDetecting: true
      });

    case actions.ActionTypes.STOP_DETECTION:
      return Object.assign({}, state, {
        isDetecting: false
      });

    case actions.ActionTypes.HOSTS_UPDATE:
      return Object.assign({}, state, {
        knownHosts: action.payload
      });

    default:
      return Object.assign({}, state);
  }
}

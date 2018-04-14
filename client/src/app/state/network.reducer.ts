import * as actions from '../actions/network.actions';

export interface IHost {
  ipAddress: string;
  hostname?: string;
  isPending: boolean;
  isAlive: boolean;
}

export interface INetworkState {
  foundHosts: IHost[];
  isDetecting: boolean;
  possibleAddresses: string[];
}

const initialState: INetworkState = {
  foundHosts: [],
  isDetecting: false,
  possibleAddresses: null
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
        foundHosts: action.payload
      });

    default:
      return Object.assign({}, state);
  }
}

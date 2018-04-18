import * as actions from '../actions/network.actions';

export interface IHost {
  ipAddress: string;
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
  possibleAddresses: []
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

    case actions.ActionTypes.POSSIBLE_ADDRESSES_CALCULATED:
      return Object.assign({}, state, {
        possibleAddresses: action.payload
      });

    default:
      return Object.assign({}, state);
  }
}

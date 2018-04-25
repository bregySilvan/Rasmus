import * as actions from '../actions/network.actions';
import { SERVER_ADDRESSES } from '../../../../config';

export interface IHost {
  ipAddress: string;
  isAlive: boolean;
}

export interface INetworkState {
  hosts: IHost[];
  isDetecting: boolean;
}

const initialState: INetworkState = {
 // hosts: [{ipAddress: '192.168.1.254', isAlive: true}],
  hosts: SERVER_ADDRESSES.map(address => ({ ipAddress: address, isAlive: true})),

  isDetecting: false,
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
        hosts: action.payload
      });

    default:
      return Object.assign({}, state);
  }
}

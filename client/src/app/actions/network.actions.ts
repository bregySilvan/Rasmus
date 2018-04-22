
import { Action } from '@ngrx/store';
import { type } from '../../utils/check-action-types';
import { IHost } from '../state/network.reducer';

const START_DETECTION: 'NETWORK: START_DETECTION' = 'NETWORK: START_DETECTION';
const STOP_DETECTION: 'NETWORK: STOP_DETECTION' = 'NETWORK: STOP_DETECTION';
const CHECK_POSSIBLE_HOSTS: 'NETWORK: CHECK_POSSIBLE_HOSTS' = 'NETWORK: CHECK_POSSIBLE_HOSTS';
const KEEP_ALIVE_ACTIVE_HOSTS: 'NETWORK: KEEP_ALIVE_ACTIVE_HOSTS' = 'NETWORK: KEEP_ALIVE_ACTIVE_HOSTS';
const TRY_UPDATE_HOSTS: 'NETWORK: TRY_UPDATE_HOSTS' = 'NETWORK: TRY_UPDATE_HOSTS';
const HOSTS_UPDATE: 'NETWORK: HOSTS_UPDATE' = 'NETWORK: HOSTS_UPDATE';



export const ActionTypes = {
  START_DETECTION: type(START_DETECTION),
  STOP_DETECTION: type(STOP_DETECTION),
  CHECK_POSSIBLE_HOSTS: type(CHECK_POSSIBLE_HOSTS),
  KEEP_ALIVE_ACTIVE_HOSTS: type(KEEP_ALIVE_ACTIVE_HOSTS),
  TRY_UPDATE_HOSTS: type(TRY_UPDATE_HOSTS),
  HOSTS_UPDATE: type(HOSTS_UPDATE)
};

export class StartDetectionAction implements Action {
  type: typeof ActionTypes.START_DETECTION = ActionTypes.START_DETECTION;
  constructor() {
    //
  }
}
export class StopDetectionAction implements Action {
  type: typeof ActionTypes.STOP_DETECTION = ActionTypes.STOP_DETECTION;
  constructor() {
    //
  }
}

export class CheckPossibleHostsAction implements Action {
  type: typeof ActionTypes.CHECK_POSSIBLE_HOSTS = ActionTypes.CHECK_POSSIBLE_HOSTS;
  constructor() {
    //
  }
}

export class KeepAliveActiveHostsAction implements Action {
  type: typeof ActionTypes.KEEP_ALIVE_ACTIVE_HOSTS = ActionTypes.KEEP_ALIVE_ACTIVE_HOSTS;
  constructor() {
    //
  }
}

export class TryUpdateHostsAction implements Action {
  type: typeof ActionTypes.TRY_UPDATE_HOSTS = ActionTypes.TRY_UPDATE_HOSTS;
  payload: IHost[];
  constructor(hosts: IHost[]) {
    this.payload = hosts;
  }
}

export class HostsUpdateAction implements Action {
  type: typeof ActionTypes.HOSTS_UPDATE = ActionTypes.HOSTS_UPDATE;
  payload: IHost[];
  constructor(hosts: IHost[]) {
    this.payload = hosts;
  }
}
export type NetworkActions =
    StartDetectionAction
  | StopDetectionAction
  | CheckPossibleHostsAction
  | KeepAliveActiveHostsAction
  | TryUpdateHostsAction
  | HostsUpdateAction


import { Action } from '@ngrx/store';
import { type } from "../utils/check-action-types";
import { IHost } from '../state/network.reducer';

const START_DETECTION: 'NETWORK: START_DETECTION' = 'NETWORK: START_DETECTION';
const HOST_UPDATE: 'NETWORK: HOST_UPDATE' = 'NETWORK: HOST_UPDATE';
const TEST_HOST: 'NETWORK: TEST_HOST_CONNECTION' = 'NETWORK: TEST_HOST_CONNECTION';
const STOP_DETECTION: 'NETWORK: STOP_DETECTION' = 'NETWORK: STOP_DETECTION';
const HOSTS_UPDATE: 'NETWORK: HOSTS_UPDATE' = 'NETWORK: HOSTS_UPDATE';
const CHECK_POSSIBLE_HOSTS: 'NETWORK: CHECK_POSSIBLE_HOSTS' = 'NETWORK: CHECK_POSSIBLE_HOSTS';
const POSSIBLE_ADDRESSES_CALCULATED: 'NETWORK: POSSIBLE_ADDRESSES_CALCULATED' = 'NETWORK: POSSIBLE_ADDRESSES_CALCULATED';
const CHECK_POSSIBLE_HOSTS_DONE: 'NETWORK: CHECK_POSSIBLE_HOSTS_DONE' = 'NETWORK: CHECK_POSSIBLE_HOSTS_DONE';

export const ActionTypes = {
  HOST_UPDATE: type(HOST_UPDATE),
  START_DETECTION: type(START_DETECTION),
  STOP_DETECTION: type(STOP_DETECTION),
  TEST_HOST: type(TEST_HOST),
  HOSTS_UPDATE: type(HOSTS_UPDATE),
  CHECK_POSSIBLE_HOSTS: type(CHECK_POSSIBLE_HOSTS),
  POSSIBLE_ADDRESSES_CALCULATED: type(POSSIBLE_ADDRESSES_CALCULATED),
  CHECK_POSSIBLE_HOSTS_DONE: type(CHECK_POSSIBLE_HOSTS_DONE)
};

export class HostUpdateAction implements Action {
  type: typeof ActionTypes.HOST_UPDATE = ActionTypes.HOST_UPDATE;
  payload: IHost;
  constructor(host: IHost) {
    this.payload = host;
  }
}

export class HostsUpdateAction implements Action {
  type: typeof ActionTypes.HOSTS_UPDATE = ActionTypes.HOSTS_UPDATE;
  payload: IHost[];
  constructor(hosts: IHost[]) {
    this.payload = hosts;
  }
}

export class StopDetectionAction implements Action {
  type: typeof ActionTypes.STOP_DETECTION = ActionTypes.STOP_DETECTION;
  constructor() {
    //
  }
}
export class StartDetectionAction implements Action {
  type: typeof ActionTypes.START_DETECTION = ActionTypes.START_DETECTION;
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
export class TestHostAction implements Action {
  type: typeof ActionTypes.TEST_HOST = ActionTypes.TEST_HOST;
  payload: IHost;
  constructor(host: IHost) {
    this.payload = host;
  }
}

export class PossibleAddressesCalculatedAction implements Action {
  type: typeof ActionTypes.POSSIBLE_ADDRESSES_CALCULATED = ActionTypes.POSSIBLE_ADDRESSES_CALCULATED;
  payload: string[];
  constructor(hosts: string[]) {
    this.payload = hosts;
  }
}

export class CheckPossibleHostsDoneAction implements Action {
  type: typeof ActionTypes.CHECK_POSSIBLE_HOSTS_DONE = ActionTypes.CHECK_POSSIBLE_HOSTS_DONE;
  payload: string;
  constructor(requestName: string) {
    this.payload = requestName;
  }
}

export type NetworkActions = HostUpdateAction
  | HostsUpdateAction
  | StartDetectionAction
  | StopDetectionAction
  | TestHostAction
  | PossibleAddressesCalculatedAction
  | CheckPossibleHostsDoneAction;

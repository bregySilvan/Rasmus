
import { Action } from '@ngrx/store';
import { type } from "../utils/check-action-types";
import { IHost } from '../state/network.reducer';

const START_DETECTION: 'NETWORK: START_DETECTION' = 'NETWORK: START_DETECTION';
const HOST_UPDATE: 'NETWORK: HOST_UPDATE' = 'NETWORK: HOST_UPDATE';
const TEST_HOST: 'NETWORK: TEST_HOST_CONNECTION' = 'NETWORK: TEST_HOST_CONNECTION';
const STOP_DETECTION: 'NETWORK: STOP_DETECTION' = 'NETWORK: STOP_DETECTION';
const HOSTS_UPDATE: 'NETWORK: HOSTS_UPDATE' = 'NETWORK: HOSTS_UPDATE';

export const ActionTypes = {
  HOST_UPDATE: type(HOST_UPDATE),
  START_DETECTION: type(START_DETECTION),
  STOP_DETECTION: type(STOP_DETECTION),
  TEST_HOST: type(TEST_HOST),
  HOSTS_UPDATE: type(HOSTS_UPDATE)
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

export class TestHostAction implements Action {
  type: typeof ActionTypes.TEST_HOST = ActionTypes.TEST_HOST;
  payload: IHost;
  constructor(host: IHost) {
    this.payload = host;
  }
}

export type NetworkActions = HostUpdateAction| HostsUpdateAction | StartDetectionAction | StopDetectionAction | TestHostAction;

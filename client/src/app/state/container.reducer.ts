import * as actions from '../actions/container.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard, IContainer } from '../../../../interfaces';
import { LogService } from '../services/log.service';
import { unionElementsDistinct } from '../../utils/functions';

export interface IContainerState {
  containers: IContainer[];
}

const initialState: IContainerState = {
  containers:[]
};

export function dragReducer(state: IContainerState = initialState, action: actions.ContainerActionTypes): IContainerState {
  switch (action.type) {

    case actions.ActionTypes.UPDATE_CONTAINERS:
      return Object.assign({}, state, {
        containers: action.payload
    });

    default:
      return Object.assign({}, state);
  }
}

import { type } from '../../utils/check-action-types';
import { Action } from '@ngrx/store';
import { IElement, IContainer } from '../../../../interfaces';

const TRY_UPDATE_CONTAINERS: 'CONTAINER: TRY_UPDATE_CONTAINERS' = 'CONTAINER: TRY_UPDATE_CONTAINERS';
const UPDATE_CONTAINERS: 'CONTAINER: UPDATE_CONTAINERS' = 'CONTAINER: UPDATE_CONTAINERS';

export const ActionTypes = {
    UPDATE_CONTAINERS: type(UPDATE_CONTAINERS),
    TRY_UPDATE_CONTAINERS: type(TRY_UPDATE_CONTAINERS)
}

export class UpdateContainersAction implements Action {
    type: typeof ActionTypes.UPDATE_CONTAINERS = ActionTypes.UPDATE_CONTAINERS;
    payload: IContainer[];
    constructor(containers: IContainer[]) {
        this.payload = containers;
    }
}

export class TryUpdateContainersAction implements Action {
    type: typeof ActionTypes.TRY_UPDATE_CONTAINERS = ActionTypes.TRY_UPDATE_CONTAINERS;
    payload: IContainer[];
    constructor(containers: IContainer[]) {
        this.payload = containers;
    }
}

export type ContainerActionTypes = UpdateContainersAction
    | TryUpdateContainersAction;
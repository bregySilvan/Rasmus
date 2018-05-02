import * as actions from '../actions/edit.actions';
import { IHost } from './network.reducer';
import { IElement, IBoard } from '../../../../interfaces';

export interface IContainer {
    elements: IElement[];
    key: string;
}

export interface IEditState {
    activeContainers: IContainer[];
    editableContainer?: IContainer;
    editableElement?: IElement;
}

const initialState: IEditState = {
    activeContainers: []
};


export function elementReducer(state: IEditState = initialState, action: actions.EditActions): IEditState {
  switch (action.type) {

    default:
      return Object.assign({}, state);
  }
}

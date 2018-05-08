import * as actions from '../actions/edit.actions';
import { IHost } from './network.reducer';
import { IElement } from '../../../../interfaces';

export interface IEditState {
    elements?: IElement[];
}

const initialState: IEditState = {

};


export function elementReducer(state: IEditState = initialState, action: actions.EditActions): IEditState {
  switch (action.type) {

    default:
      return Object.assign({}, state);
  }
}

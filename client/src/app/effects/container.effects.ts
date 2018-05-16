import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { IElement, IContainer } from '../../../../interfaces';
import { IAppStore } from '../app.state';
import { Store } from '@ngrx/store';
import { LogService } from '../services/log.service';
import * as containerActions from '../actions/container.actions';
import * as elementActions from '../actions/element.actions';
import { unionElementsDistinct } from '../../utils/functions';

@Injectable()
export class ContainerEffects {


  //  @Effect()
    //@ts-ignore
   /* onDrop$ = this.actions$.ofType(elementActions.ActionTypes.UPDATE_ELEMENTS)
        .map<any, IElement[]>(toPayload)
        .withLatestFrom(this.store$, (payload, state: IAppStore) => ({
            //   canDrop: state.drag.canDrop,
            oldElements: state.element.advertisements.filter(el => el.type === 'container'),
            update: payload.filter(el => el.type === 'container'),
        }))
        .map(x => unionElementsDistinct(x.oldElements, x.update))
        .filter(x => x.hasChanged)
        .map(x => new containerActions.UpdateContainersAction(x.unionArr));
*/
    constructor(private store$: Store<IAppStore>,
        private actions$: Actions,
        private logger: LogService) {
    }


}
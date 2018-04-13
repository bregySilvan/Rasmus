

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchmap'
import 'rxjs/add/operator/do'
import { IAppStore } from '../app.state';
import * as router from '../actions/router.actions';
@Injectable()
export class RouterEffects {

    @Effect({ dispatch: false }) navigateTo$ = this.actions$.ofType(router.ActionTypes.NAVIGATE_TO)
        .do(x => console.log(x));

    constructor(
        private actions$: Actions,
        private store$: Store<IAppStore>
    ) {
    }
}
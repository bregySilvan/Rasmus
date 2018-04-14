

import { Injectable } from '@angular/core';
//import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import '@ngrx/effects/'
import * as router from '../actions/router.actions';
import 'rxjs/add/operator/map'
import { Effect, Actions, toPayload } from '@ngrx/effects';
declare var console: any;
@Injectable()
export class RouterEffects {

    // wokraround for this reference error..
    private static _actions$;

    @Effect({ dispatch: false })
    navigateTo$ = this.actions$.ofType(router.ActionTypes.NAVIGATE_TO)
        .map(x => console.log(' navigateToIsTriggered'));

    constructor(
        private actions$: Actions,
        private store$: Store<IAppStore>
    ) {
      RouterEffects._actions$ = actions$;
    }
}

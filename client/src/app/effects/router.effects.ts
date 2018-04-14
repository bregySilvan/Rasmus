

import { Injectable } from '@angular/core';
//import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as routerActions from '../actions/router.actions';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import { Effect, Actions, toPayload } from '@ngrx/effects';
declare var console: any;
@Injectable()
export class RouterEffects {

  // wokraround for this reference error..
  private static _actions$;

  @Effect()
  navigateTo$ = this.actions$.ofType(routerActions.ActionTypes.NAVIGATE_TO)
    .map<any, string>(toPayload)
    .do((x => console.warn(x)))
    .switchMap(url => this.router.navigateByUrl(url)
      .then(() =>  {
        console.log('navigation success');
        return new routerActions.NavigationSuccess(url)
      })
      .catch((error) => new routerActions.NavigationError(error)));

  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private router: Router
  ) {
    RouterEffects._actions$ = actions$;
  }
}

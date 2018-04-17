

import { Injectable } from '@angular/core';
//import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as routerActions from '../actions/router.actions';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter';
import { Effect, Actions, toPayload } from '@ngrx/effects';
declare var console: any;
@Injectable()
export class RouterEffects {

  @Effect()
  // @ts-ignore
  navigateTo$ = this.actions$.ofType(routerActions.ActionTypes.NAVIGATE_TO)
    .withLatestFrom(this.store$, (action, state) => ({
      currentUrl: state.router.currentUrl,
      requestedUrl: action.payload
    }))
    .filter((x => x.requestedUrl !== x.currentUrl))
    .switchMap(x => this.router.navigateByUrl(x.requestedUrl)
      .then(() => new routerActions.NavigationSuccess(x.requestedUrl))
      .catch(error => new routerActions.NavigationError(error)));

  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private router: Router
  ) {

  }
}

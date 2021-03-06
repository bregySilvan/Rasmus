

import { Injectable } from '@angular/core';
//import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Request } from 'express';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as routerActions from '../actions/router.actions';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter';
import { Effect, Actions, toPayload } from '@ngrx/effects';

@Injectable()
export class RouterEffects {


  @Effect()
  // @ts-ignore
  startNavigation$ = this.actions$.ofType(routerActions.ActionTypes.START_NAVIGATION)
  .withLatestFrom(this.store$, (action, state) => ({
    router: state.router,
    requestedUrl: action.payload
  }))
  .filter(x => x.requestedUrl !== x.router.currentUrl && !x.router.isNavigating)
  .map(x => new routerActions.NavigateTo(x.requestedUrl));

  @Effect()
  // @ts-ignore
  navigateTo$ = this.actions$.ofType(routerActions.ActionTypes.NAVIGATE_TO)
    .map<any, string>(toPayload)
    .do(url => this.router.navigateByUrl(url)
      .then(() => this.store$.dispatch(new routerActions.NavigationSuccess(url)))
      .catch(error => this.store$.dispatch(new routerActions.NavigationError(error))));

  constructor(
    private actions$: Actions,
    private store$: Store<IAppStore>,
    private router: Router
  ) {

  }
}

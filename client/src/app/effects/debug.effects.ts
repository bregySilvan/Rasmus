import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
@Injectable()
export class DebugEffect {
  //@ts-ignore
  @Effect({ dispatch: false }) debug$ = this.actions$.withLatestFrom(this.store, (action, state) => ({ action, state }))
  //  .do(x => this.logger.log(new Date().toISOString(), x.action.type, x.action, x.state));
    .do(x => this.logger.log(new Date().toISOString(), x));

  constructor(private store: Store<IAppStore>, private actions$: Actions, private logger: LogService) {
  }

}

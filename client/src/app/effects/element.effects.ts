import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
@Injectable()
export class ElementEffects {

  constructor(private store: Store<IAppStore>, 
              private actions$: Actions,
              private logger: LogService) {
  }

}

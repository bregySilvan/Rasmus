import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { LogService } from '../services/log.service';
import { IAppStore } from '../app.state';
import * as elementActions from '../actions/element.actions';
import 'rxjs/add/operator/withLatestFrom'
import 'rxjs/add/operator/do'
import { IHost } from '../state/network.reducer';
import { ElementService } from '../services/element.service';
import { IListElement } from '../../../../interfaces';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class ElementEffects {




  @Effect({ dispatch: false })
  //@ts-ignore
  loadAvailableElements$ = this.actions$.ofType(elementActions.ActionTypes.LOAD_AVAILABLE_BOARDS)
    .withLatestFrom(this.store$, (payload, state) => (state.network))
    .map(x => x.hosts.filter((host: IHost) => host.isAlive))
    .filter(activeHosts => activeHosts.length)
    .do(activeHosts => {
      activeHosts.forEach((host: IHost) => {
        this.elementService.getElements(host).do((elements: IListElement[]) => {
          this.elementService.tryElementsUpdate(elements);
        }).catch((error: any) => {
          this.logService.error('unknwon error when requesting:: ', host.ipAddress);
          // actually nothing is done with this error since it means unknown error...
          return Observable.create(error);
        });
      });
    });


  constructor(private store: Store<IAppStore>,
    private actions$: Actions,
    private logService: LogService,
    private store$: Store<IAppStore>,
    private elementService: ElementService) {
  }

}

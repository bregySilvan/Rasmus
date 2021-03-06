import { RouterModule, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as router from '../actions/router.actions';
import { LogService } from './log.service';

@Injectable()
export class RouterService {

    public navigateTo(url: string): void {
      this.store$.dispatch(new router.NavigateTo(url));
    }

    constructor(private store$: Store<IAppStore>,
                private logService: LogService) {

    }
}

import { Component } from '@angular/core';
import { IListElement } from '../../../../interfaces';
import { listElements } from '../dummy-store';
import { RouterService } from '../services/router.service';
import { Store } from '@ngrx/store';
import * as networkActions from '../actions/network.actions';
import * as elementActions from '../actions/element.actions';
import { IAppStore } from '../app.state';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-edit-borads',
  templateUrl: './edit-boards.component.html',
  styleUrls: ['./edit-boards.component.css']
})
export class EditBoardsComponent {

  public defaultAdvertisementKey = '1';
  private isDetecting = false;
  elements: IListElement[] = listElements;


  public onStartHostDetection(event: any): void {
    this.store$.dispatch(new networkActions.StartDetectionAction());
  }

  public onStopHostDetection(event: any): void {
    this.store$.dispatch(new networkActions.StopDetectionAction());
  }

  public onStartGetElements(event: any) {
    this.store$.dispatch(new elementActions.LoadAvailableElementsAction());
  }

  public onStartGetBoards(event: any) {
    this.store$.dispatch( new elementActions.LoadAvailableBoardsAction());
  }

  constructor(private routerService: RouterService,
              private store$: Store<IAppStore> ) {
  }

}

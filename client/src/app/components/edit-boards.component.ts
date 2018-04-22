import { Component, ChangeDetectorRef } from '@angular/core';
import { IListElement } from '../../../../interfaces';
import { RouterService } from '../services/router.service';
import { Store } from '@ngrx/store';
import * as networkActions from '../actions/network.actions';
import * as elementActions from '../actions/element.actions';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-edit-borads',
  templateUrl: './edit-boards.component.html',
  styleUrls: ['./edit-boards.component.css']
})
export class EditBoardsComponent {

  public defaultAdvertisementKey = '1';
  private isDetecting = false;

  elements: IListElement[] = [];


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
              private store$: Store<IAppStore>,
              private logService: LogService,
              private changeRef: ChangeDetectorRef) {
              
  }

  ngOnInit() {
    this.store$.select(x => x.element).subscribe(x =>  {
      this.logService.log('elements: ', x.availableElements);
      this.changeRef.detectChanges();
      this.elements = x.availableElements;
    });
  }

}

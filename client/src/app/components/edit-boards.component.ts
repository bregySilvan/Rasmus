import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { IListElement } from '../../../../interfaces';
import { RouterService } from '../services/router.service';
import { Store } from '@ngrx/store';
import * as networkActions from '../actions/network.actions';
import * as elementActions from '../actions/element.actions';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-edit-borads',
  templateUrl: './edit-boards.component.html',
  styleUrls: ['./edit-boards.component.css']
})
export class EditBoardsComponent implements OnInit, OnDestroy {

  public defaultAdvertisementKey = '1';
  private isDetecting = false;
  private elementSub: Subscription = new Subscription();
  public availableElements: IListElement[] = [];
  public elementsInBoard: IListElement[] = [];

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
  
  public onItemDrop(event: any) {
    this.logService.log('item drop occured, event: ', event);
  }

  constructor(private routerService: RouterService,
              private store$: Store<IAppStore>,
              private logService: LogService,
              private changeRef: ChangeDetectorRef) {
              
  }

  ngOnInit() {
    
    this.elementSub = this.store$.select(x => x.element).subscribe(x =>  {
      this.logService.log('elements: ', x.availableElements);
      this.availableElements = x.availableElements.concat();
      this.elementsInBoard = x.availableElements.concat();
     // this.changeRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.elementSub.unsubscribe();
  }

}

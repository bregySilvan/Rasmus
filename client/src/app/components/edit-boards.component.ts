import { Component, ChangeDetectorRef } from '@angular/core';
import { IListElement, IBoard } from '../../../../interfaces';
import { RouterService } from '../services/router.service';
import { Store } from '@ngrx/store';
import * as networkActions from '../actions/network.actions';
import * as elementActions from '../actions/element.actions';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';
import { DataService } from '../services/data.service';
import { IHost } from '../state/network.reducer';
import { LOCAL_ADDRESS } from '../../../../config';

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
  host = LOCAL_ADDRESS;

  public onGetBoards(event: any): void {
    this.dataService.getBoards(this.host, []).subscribe(x => this.logService.log(x),
      err => this.logService.log(err));
  }

  public onGetElements(event: any): void {
    this.dataService.getElements(this.host, []).subscribe(x => this.logService.log(x),
      err => this.logService.log(err));
  }

  public onSaveBoards(event: any) {
    let board1: IBoard = { key: 'myFirstBoard', elementKeys: ['myFirstElement', 'mySecondElement'], type: 'board' };
    let board2: IBoard = { key: 'mySecondBoard', elementKeys: ['myFirstElement', 'mySecondElement'], type: 'board' };
    this.dataService.saveBoards(this.host, [board1, board2]);//.subscribe(x => this.logService.warn('saved some boards and it acuztally responded'));
  }

  public onSaveElements(event: any) {
    let element1: IListElement = { key: 'myFirstElement', type: 'advertisement' };
    let element2: IListElement = { key: 'mySecondElement', type: 'advertisement' };
    this.dataService.saveElements(this.host, [element1, element2]);//.subscribe(x => this.logService.warn('saved some elements and it acuztally responded'));;
  }

  constructor(private routerService: RouterService,
    private store$: Store<IAppStore>,
    private logService: LogService,
    private changeRef: ChangeDetectorRef,
    private dataService: DataService) {

  }

  ngOnInit() {
    this.store$.select(x => x.element).subscribe(x => {
      //  this.changeRef.detectChanges();
      this.elements = x.availableElements;
    });
  }

}

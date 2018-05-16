
import { IElement, IBoard } from '../../../../interfaces';
import { Component, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Store } from '@ngrx/store';
import * as networkActions from '../actions/network.actions';
import * as elementActions from '../actions/element.actions';
import { IAppStore } from '../app.state';
import { LogService } from '../services/log.service';
import { DataService } from '../services/data.service';
import { IHost } from '../state/network.reducer';
import { LOCAL_ADDRESS, ALL_AVAILABLE_ADS_LIST } from '../../../../config';
import { Subscription } from 'rxjs';
import { KeyService } from '../services/key.service';
import { ElementService } from '../services/element.service';
import { NetworkService } from '../services/network.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-edit-borads',
  templateUrl: './edit-boards.component.html',
  styleUrls: ['./edit-boards.component.css']
})
export class EditBoardsComponent implements OnInit, OnDestroy {

  private isDetecting = false;

  elements: IElement[] = [];
  host = LOCAL_ADDRESS;
  //firstListKey = this.newItemKey();
 // secondListKey = this.newItemKey();

 firstListKey = ALL_AVAILABLE_ADS_LIST;
 secondListKey = ALL_AVAILABLE_ADS_LIST+1;
 
  private elementSub: Subscription = new Subscription();
  public elementListLeft: IElement | null = null;
  public elementListRight: IElement | null = null;

  public onGetElements(event: any): void {
    this.elementService.loadAvailableElemens();
  }

  public onSaveBoards(event: any) {
    let element1: IElement = { key: 'myFirstElement', type: 'advertisement' };
    let element2: IElement = { key: 'mySecondElement', type: 'advertisement' };

    let board1: IBoard = { key: 'myFirstBoard', elements: [element1, element2], type: 'board' };
    let board2: IBoard = { key: 'mySecondBoard', elements: [element1, element2], type: 'board' };
    this.dataService.saveBoards(this.host, [board1, board2]);//.subscribe(x => this.logService.warn(this, 'saved some boards and it acuztally responded'));
  }

  public onSaveElements(event: any) {
    let element1: IElement = { key: 'myFirstElement', type: 'advertisement' };
    let element2: IElement = { key: 'mySecondElement', type: 'advertisement' };
    this.dataService.saveElements(this.host, [element1, element2]);//.subscribe(x => this.logService.warn(this, 'saved some elements and it acuztally responded'));;
  }


  public newItemKey(): string {
    return this.keyService.newKey();
  }

  ngOnInit() {
    this.elementSub = this.store$.select(x => x.element).subscribe(x =>  {
      let leftList = x.advertisements.find(element => element && element.key === this.firstListKey) || null;
      let rightList = x.advertisements.find(element => element && element.key === this.secondListKey) || null;

      if(leftList) {
        this.elementListLeft = leftList;
      }
      if(rightList) {//
        this.elementListRight = rightList;
      }
    });
  }
  
  public getFirstListEl(): IElement | null {
    return this.elementListLeft
  }

  public getSecondListEl(): IElement | null {
    return this.elementListRight;
  }

  ngOnDestroy() {
    this.elementSub.unsubscribe();
  }

  constructor(private routerService: RouterService,
    private store$: Store<IAppStore>,
    private logService: LogService,
    private keyService: KeyService,
    private elementService: ElementService,
    private networkService: NetworkService,
    private changeRef: ChangeDetectorRef,
    private dataService: DataService) {
  }


}

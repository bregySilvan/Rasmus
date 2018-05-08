
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
import { LOCAL_ADDRESS } from '../../../../config';
import { Subscription } from 'rxjs';
import { KeyService } from '../services/key.service';

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

  private elementSub: Subscription = new Subscription();
  public availableElements: IElement[] = [];
  public elementsInBoard: IElement[] = [];


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
    let element1: IElement = { key: 'myFirstElement', type: 'advertisement' };
    let element2: IElement = { key: 'mySecondElement', type: 'advertisement' };
    this.dataService.saveElements(this.host, [element1, element2]);//.subscribe(x => this.logService.warn('saved some elements and it acuztally responded'));;
  }
  
  public onItemDrop(event: any) {
    this.logService.log('item drop occured, event: ', event);
  }

  constructor(private routerService: RouterService,
    private store$: Store<IAppStore>,
    private logService: LogService,
    private keyService: KeyService,
    private changeRef: ChangeDetectorRef,
    private dataService: DataService) {
  }

  public newItemKey(): string {
    return this.keyService.newKey();
  }

  ngOnInit() {
    this.elementSub = this.store$.select(x => x.element).subscribe(x =>  {
      let usedAvailableElements = x.availableElements.filter(element => element.type === 'advertisement');
      
      this.logService.log('elements: ', usedAvailableElements);
      this.availableElements = usedAvailableElements.concat();
      this.elementsInBoard = usedAvailableElements.concat();
    });


  }

  ngOnDestroy() {
    this.elementSub.unsubscribe();
  }

}

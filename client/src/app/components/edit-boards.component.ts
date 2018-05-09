
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
 secondListKey = 'secondListKey';
 firstListKey = 'firstListKey';
 
  private elementSub: Subscription = new Subscription();
  public availableElements: IElement[] = [];
  public elementsInBoard: IElement[] = [];

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
      let usedAvailableElements = x.availableElements.filter(element => element.type === 'advertisement');
      
      this.availableElements = usedAvailableElements.concat();
      this.elementsInBoard = usedAvailableElements.concat();
    });
  }
  
  public getSecondListEl(): IElement {
    return <IBoard>{ key: this.secondListKey, elements: this.availableElements, type: 'board' };
  }

  public getFirstListEl(): IElement {
    return <IBoard>{ key: this.firstListKey, elements: this.elementsInBoard, type: 'board' };
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

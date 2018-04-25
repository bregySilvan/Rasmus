import { Component, Input, OnInit } from '@angular/core';
import { IListElement, ElementTypes } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as router from '../actions/router.actions';
import { LogService } from '../services/log.service';

declare var window, console, localStorage;
export type ListAlignments = 'horizontal' | 'vertical';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

// pls find a better name. It's confusing since list-element component also exists
export class ElementListComponent implements OnInit {

  @Input() maxElementsDisplayed: number = 15;
  @Input() alignment: ListAlignments = 'vertical';
  @Input() isDragDropEnabled = true; //is for future purposes.
  @Input() elements: IListElement[] = [];

  ngOnInit() {
    console.log('elements in elementList: ', this.elements);
  }

  onDrop(event: any) {
    this.logService.log('onDrop in elementList emitted,', event);
  }
  

  constructor(private store: Store<IAppStore>,
              private logService: LogService) {
    //
  }

}

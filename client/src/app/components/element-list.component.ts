import { Component, Input, OnInit } from '@angular/core';
import { IElement, ElementTypes } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as router from '../actions/router.actions';
import { LogService } from '../services/log.service';
import { DragService } from '../services/drag.service';

export type ListAlignments = 'horizontal' | 'vertical';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

// pls find a better name. It's confusing since list-element component also exists
export class ElementListComponent {

  @Input() maxElementsDisplayed: number = 15;
  @Input() alignment: ListAlignments = 'vertical';
  @Input() isDragDropEnabled = true; //is for future purposes.
  @Input() elements: IElement[] = [];
  public startIndex = 0;
  private key = '' + Date.now() + '_' + ('' + Math.random()).substring(1, 7);;

  onElementDrop(event: any) {
    this.logService.log('onDrop in elementList emitted', event);
  }

  constructor(private store$: Store<IAppStore>,
      private logService: LogService) {

  }



}

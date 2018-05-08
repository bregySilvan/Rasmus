import { Component, Input, OnInit } from '@angular/core';
import { IElement, ElementTypes, IBoard } from '../../../../interfaces';
import { Store } from '@ngrx/store';
import { IAppStore } from '../app.state';
import * as router from '../actions/router.actions';
import { LogService } from '../services/log.service';
import { DragService } from '../services/drag.service';
import { GlobalEditable } from '../base/global-edit.base';
import { InitService } from '../services/init.service';
import { KeyService } from '../services/key.service';

export type ListAlignments = 'horizontal' | 'vertical';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})

// pls find a better name. It's confusing since list-element component also exists
export class ElementListComponent extends GlobalEditable {

  @Input() maxElementsDisplayed: number = 15;
  @Input() alignment: ListAlignments = 'vertical';
  @Input() isDragDropEnabled = true; //is for future purposes.

  onElementDrop(event: any) {
    this.logService.log('onDrop in elementList emitted', event);
  }

  constructor(private logService: LogService,
              store$: Store<IAppStore>,
              initService: InitService) {

        super(initService, store$);
  }



}

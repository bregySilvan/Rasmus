import { Component, Input, OnInit, Output } from '@angular/core';
import { IListElement, ElementTypes } from '../../../../interfaces';
import { LogService } from '../services/log.service';
import { EventEmitter } from 'protractor';
/**
 * responsible for holding either
 * an advertisement
 * a boardType for example..
 * an element-list
 */

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-list-element',
  templateUrl: './list-element.component.html',
  styleUrls: ['./list-element.component.css']
})
export class ListElementComponent implements OnInit {

  @Input() element: IListElement | null = null;
  @Input() isDragDropEnabled: boolean = false;


  constructor(private logService: LogService) {

  }

  ngOnInit() {
    if(!this.element)
      this.logService.log('received invalid element in ListElement comp: ', this.element);
  }

}

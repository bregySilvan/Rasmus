import { Component, Input, OnInit, Output } from '@angular/core';
import { IElement, ElementTypes } from '../../../../interfaces';
import { LogService } from '../services/log.service';
import { EventEmitter } from 'protractor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ras-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  @Input() element: IElement | null = null;
  @Input() isDragDropEnabled: boolean = false;


  constructor(private logService: LogService) {

  }

  ngOnInit() {
    if(!this.element)
      this.logService.log(this, 'received invalid element in ListElement comp: ', this.element);
  }

}
